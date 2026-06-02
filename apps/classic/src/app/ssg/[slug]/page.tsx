import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// =============================================================================
// STATIC SITE GENERATION (SSG) of a DYNAMIC ROUTE  (route legend: ● SSG)
// =============================================================================
// `/ssg/[slug]` is a parameterized route, yet every page is generated at BUILD
// time — the classic "statically generated site" (think docs/blog/marketing).
//
// HOW: `generateStaticParams()` tells Next which slugs exist. Next renders one
// static HTML file per returned slug at build time. `export const dynamicParams
// = false` (a Route Segment Config) locks the set: any slug NOT in the list
// returns 404 instead of being rendered on demand — a truly fixed static site.
// (This config is one of the things cacheComponents forbids, which is why the
// PPR app can't use it — another reason these examples live in the classic app.)
//
// NEXT 16: `params` is a Promise and must be awaited (it used to be a plain
// object). Same async change as cookies()/searchParams.

// Build-time constant — these pages are generated at build, so "now" is the
// build moment. (new Date() in a static render just bakes the build time in.)
const BUILT_AT = new Date().toISOString();

const POSTS: Record<string, { title: string; body: string }> = {
  'hello-world': {
    title: 'Hello World',
    body: 'The first statically built post.',
  },
  'rendering-101': {
    title: 'Rendering 101',
    body: 'Static, dynamic, and in between.',
  },
  ppr: { title: 'Why PPR', body: 'Static shell + streamed dynamic holes.' },
};

// Only these slugs get built.
export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

// Lock the set: slugs not returned above 404 instead of rendering on demand.
export const dynamicParams = false;

// Metadata is also generated per-slug at build time.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  return { title: post ? post.title : 'Not found' };
}

export default async function SsgPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <article className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      <p>{post.body}</p>
      <p className="opacity-50 text-xs">
        slug: <code>{slug}</code> — built at {BUILT_AT} (frozen at build time)
      </p>
    </article>
  );
}
