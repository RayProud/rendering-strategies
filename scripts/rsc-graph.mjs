#!/usr/bin/env node
// =============================================================================
// RSC boundary analyzer  (monorepo: scans every app in apps/*)
// =============================================================================
// Statically maps the Server/Client component tree of each Next.js App Router
// app WITHOUT running it, so it can run in CI.
//
// WHY THIS EXISTS
//   Tools like @rsc-boundary/next and DevConsole are dev-only visual overlays —
//   great in the browser, useless in a pipeline. This script answers "if I drop
//   a 'use client' somewhere mid-chain, which descendants silently flip to the
//   client bundle?" — and fails CI when that regresses.
//
// HOW IT WORKS (per app)
//   1. Parse every src/**/*.{ts,tsx} with the TypeScript compiler.
//   2. Read the leading directive ('use client' / 'use server') + relative import
//      edges (static imports + dynamic import()).
//   3. Walk the import graph from the route entry points (page/layout/etc, which
//      are Server Components by default), propagating an environment:
//        • server importing a 'use client' module → crosses a boundary; that
//          module and everything below it become CLIENT.
//        • client importing anything → stays CLIENT (the "contagion"), EXCEPT a
//          'use server' module, which stays a server action (only a reference
//          ships). A module reached from BOTH sides is SHARED ("universal").
//   4. Emit a Mermaid graph (one subgraph per app) into the README + a snapshot.
//   5. --check diffs against the snapshot and exits non-zero when a module moves
//      toward the client (server→client/shared, shared→client).
//
// USAGE
//   node scripts/rsc-graph.mjs           # regenerate snapshot + README graph
//   node scripts/rsc-graph.mjs --check   # CI: fail on client-boundary regressions

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
} from 'node:fs';
import { join, relative, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const APPS_DIR = join(ROOT, 'apps');
const SNAPSHOT = join(ROOT, 'rsc-graph.snapshot.json');
const README = join(ROOT, 'README.md');
const CHECK = process.argv.includes('--check');

const EXTS = ['.tsx', '.ts'];
const ENTRY_RE =
  /\/(page|layout|template|loading|error|not-found|default|route)\.tsx?$/;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXTS.some((e) => p.endsWith(e)) && !p.endsWith('.d.ts'))
      out.push(p);
  }
  return out;
}

function parse(file) {
  const src = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(
    file,
    src,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let directive = null;
  const imports = [];

  for (const stmt of sf.statements) {
    if (ts.isExpressionStatement(stmt) && ts.isStringLiteral(stmt.expression)) {
      const v = stmt.expression.text;
      if (v === 'use client') directive = 'client';
      else if (v === 'use server') directive = 'server';
      continue;
    }
    break;
  }

  const addSpec = (spec) => {
    if (spec.startsWith('.') || spec.startsWith('@/')) imports.push(spec);
  };
  const visit = (node) => {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      addSpec(node.moduleSpecifier.text);
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    )
      addSpec(node.arguments[0].text);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { directive, imports };
}

// Analyze a single app rooted at <appDir>/src. Returns nodes + classification.
function analyzeApp(appName, appDir) {
  const SRC = join(appDir, 'src');
  if (!existsSync(SRC)) return null;

  const resolveSpec = (fromFile, spec) => {
    const base = spec.startsWith('@/')
      ? join(SRC, spec.slice(2))
      : resolve(dirname(fromFile), spec);
    const candidates = [
      ...EXTS.map((e) => base + e),
      ...EXTS.map((e) => join(base, `index${e}`)),
    ];
    for (const c of candidates) if (existsSync(c)) return c;
    return null;
  };

  const files = walk(SRC);
  const id = (f) => relative(SRC, f).replace(/\\/g, '/');
  const nodes = new Map();
  for (const f of files) {
    const { directive, imports } = parse(f);
    const edges = imports.map((s) => resolveSpec(f, s)).filter(Boolean);
    nodes.set(f, { directive, edges });
  }

  const envs = new Map();
  const boundaryEdges = new Set();
  const visited = new Set();

  function mark(file, env) {
    const node = nodes.get(file);
    if (!node) return;
    if (!envs.has(file)) envs.set(file, new Set());
    envs.get(file).add(env);
    const key = `${file}::${env}`;
    if (visited.has(key)) return;
    visited.add(key);

    for (const child of node.edges) {
      const childNode = nodes.get(child);
      if (!childNode) continue;
      if (childNode.directive === 'server') {
        mark(child, 'server'); // action: only a reference crosses to client
        continue;
      }
      let childEnv = env;
      if (env === 'server' && childNode.directive === 'client') {
        childEnv = 'client';
        boundaryEdges.add(`${file}->${child}`);
      } else if (env === 'client') {
        childEnv = 'client';
      }
      mark(child, childEnv);
    }
  }

  for (const [file, node] of nodes) {
    if (ENTRY_RE.test(file.replace(/\\/g, '/')))
      mark(file, node.directive === 'client' ? 'client' : 'server');
  }
  for (const name of ['instrumentation-client.ts', 'instrumentation.ts']) {
    const p = join(SRC, name);
    if (nodes.has(p)) mark(p, name.includes('client') ? 'client' : 'server');
  }

  const kindOf = (file) => {
    const node = nodes.get(file);
    if (node.directive === 'server') return 'server-action';
    const e = envs.get(file);
    if (!e || e.size === 0) return 'unreached';
    if (e.has('server') && e.has('client')) return 'shared';
    return e.has('client') ? 'client' : 'server';
  };

  const classification = {};
  for (const f of files) classification[`${appName}/${id(f)}`] = kindOf(f);

  return { appName, files, nodes, boundaryEdges, classification, id };
}

const apps = readdirSync(APPS_DIR)
  .filter((n) => statSync(join(APPS_DIR, n)).isDirectory())
  .map((n) => analyzeApp(n, join(APPS_DIR, n)))
  .filter(Boolean);

const classification = Object.assign({}, ...apps.map((a) => a.classification));

// --- Mermaid (one subgraph per app) ------------------------------------------
function mermaid() {
  const kindClass = {
    client: 'client',
    server: 'server',
    shared: 'shared',
    'server-action': 'action',
    unreached: 'unreached',
  };
  const lines = ['graph TD'];
  for (const app of apps) {
    const safe = (f) =>
      `${app.appName}__${app.id(f).replace(/[^a-zA-Z0-9]/g, '_')}`;
    lines.push(`  subgraph ${app.appName}["apps/${app.appName}"]`);
    for (const f of app.files) {
      const k = classification[`${app.appName}/${app.id(f)}`];
      lines.push(`    ${safe(f)}["${app.id(f)}"]:::${kindClass[k]}`);
    }
    for (const [f, node] of app.nodes) {
      for (const child of node.edges) {
        if (!app.nodes.has(child)) continue;
        const boundary = app.boundaryEdges.has(`${f}->${child}`);
        lines.push(
          boundary
            ? `    ${safe(f)} ==>|use client| ${safe(child)}`
            : `    ${safe(f)} --> ${safe(child)}`,
        );
      }
    }
    lines.push('  end');
  }
  lines.push('  classDef server fill:#dbeafe,stroke:#3b82f6,color:#1e3a8a;');
  lines.push('  classDef client fill:#ffedd5,stroke:#f97316,color:#7c2d12;');
  lines.push('  classDef shared fill:#ede9fe,stroke:#8b5cf6,color:#4c1d95;');
  lines.push('  classDef action fill:#dcfce7,stroke:#22c55e,color:#14532d;');
  lines.push('  classDef unreached fill:#f3f4f6,stroke:#9ca3af,color:#6b7280;');
  return lines.join('\n');
}

function writeReadmeGraph() {
  if (!existsSync(README)) return;
  const md = readFileSync(README, 'utf8');
  const START = '<!-- RSC_GRAPH_START -->';
  const END = '<!-- RSC_GRAPH_END -->';
  const block = `${START}\n\n\`\`\`mermaid\n${mermaid()}\n\`\`\`\n\n${END}`;
  if (md.includes(START) && md.includes(END)) {
    writeFileSync(
      README,
      md.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block),
    );
    console.log('Updated RSC graph block in README.md');
  } else {
    console.log('README markers not found; skipping README update.');
  }
}

// --- snapshot + check --------------------------------------------------------
const RANK = {
  server: 0,
  'server-action': 0,
  unreached: 0,
  shared: 1,
  client: 2,
};

function check() {
  if (!existsSync(SNAPSHOT)) {
    console.error(
      'No snapshot. Run `npm run analyze:rsc` and commit rsc-graph.snapshot.json first.',
    );
    process.exit(2);
  }
  const prev = JSON.parse(readFileSync(SNAPSHOT, 'utf8')).classification ?? {};
  const regressions = [];
  const changes = [];
  for (const key of new Set([
    ...Object.keys(prev),
    ...Object.keys(classification),
  ])) {
    const before = prev[key] ?? '(new)';
    const after = classification[key] ?? '(removed)';
    if (before === after) continue;
    changes.push(`  ${key}: ${before} → ${after}`);
    if ((RANK[after] ?? 0) > (RANK[before] ?? 0))
      regressions.push(`  ✗ ${key}: ${before} → ${after}`);
  }
  if (changes.length === 0) {
    console.log('✓ RSC boundary unchanged across all apps.');
    return;
  }
  console.log('RSC boundary changes:\n' + changes.join('\n'));
  if (regressions.length > 0) {
    console.error(
      '\n✗ Client-boundary regression — these modules now ship MORE to the client:\n' +
        regressions.join('\n') +
        '\n\nIf intended, run `npm run analyze:rsc` and commit the updated snapshot.',
    );
    process.exit(1);
  }
  console.log('\n✓ Changes only move work toward the server (no regression).');
}

if (CHECK) {
  check();
} else {
  const total = apps.reduce((n, a) => n + a.files.length, 0);
  writeFileSync(
    SNAPSHOT,
    JSON.stringify(
      { generatedAt: new Date().toISOString(), classification },
      null,
      2,
    ) + '\n',
  );
  console.log(
    `Wrote ${relative(ROOT, SNAPSHOT)} (${total} modules across ${apps.length} apps).`,
  );
  writeReadmeGraph();
}
