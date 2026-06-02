// =============================================================================
// SHARED LOGGING CONFIG  (runtime-agnostic — safe to import ANYWHERE)
// =============================================================================
// This is the crux of "how do you use the same logging provider on the client
// AND the server" (the LogTape question).
//
// THE MENTAL MODEL:
//   • Logger identity is shared: `getLogger(['app', 'actions'])` returns the
//     "same" logical logger on every runtime. Category hierarchy + log levels
//     are universal data — they belong here, in a shared module.
//   • Sinks (WHERE logs physically go) are runtime-specific: the browser writes
//     to the devtools console; the server might write to stdout, a file, a log
//     aggregator, OpenTelemetry, etc. Those sink IMPLEMENTATIONS must live in
//     the per-runtime config files (instrumentation.ts / instrumentation-client.ts),
//     NOT here.
//
// WHY THE SPLIT MATTERS (the trap):
//   If you import a Node-only sink (e.g. `@logtape/file`'s getFileSink, or a
//   getStreamSink wrapping process.stderr) into THIS shared module, then every
//   client component that imports a logger from here drags `node:fs` / `node:stream`
//   into the browser bundle → build error or a broken bundle. Keep this module
//   free of any runtime-specific imports. It only describes *which categories
//   exist and at what level*, and names the sinks by string.
//
// Both instrumentation files import `LOGGER_CONFIGS` below and bind the string
// name "console" to their own concrete sink. Same categories, two destinations.

import type { LogLevel } from '@logtape/logtape';

/** Category hierarchy used across the app. Strings only — fully serializable. */
export const CATEGORY: Record<'app' | 'actions' | 'ui', string[]> = {
  app: ['app'],
  actions: ['app', 'actions'],
  ui: ['app', 'ui'],
};

/**
 * The shared logger→sink wiring. Each runtime provides a sink registered under
 * the name "console"; the categories and levels are identical everywhere, which
 * is what makes the logger behave "the same" on client and server.
 */
export const LOGGER_CONFIGS: Array<{
  category: string[];
  lowestLevel: LogLevel;
  sinks: string[];
}> = [
  { category: CATEGORY.app, lowestLevel: 'debug', sinks: ['console'] },
  // Silence LogTape's own internal meta logger unless something goes wrong.
  { category: ['logtape', 'meta'], lowestLevel: 'warning', sinks: ['console'] },
];
