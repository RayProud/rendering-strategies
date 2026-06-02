/** @type {import('next').NextConfig} */
const nextConfig = {
  // ---------------------------------------------------------------------------
  // Cache Components = Partial Prerendering (PPR) in Next.js 16.
  // The old `experimental.ppr` flag is gone; this is the supported replacement.
  //
  // This flag is APP-WIDE. Once it is on, Next.js prerenders a static shell for
  // every route and treats any runtime access (`await cookies()`, `headers()`,
  // `searchParams`, `Math.random()`, `Date.now()`, ...) that is NOT wrapped in a
  // <Suspense> boundary (or behind `'use cache'` / `connection()`) as a BUILD
  // ERROR. That is why enabling PPR forced the dynamic example pages in this repo
  // to either await + <Suspense>-wrap their runtime reads or call `connection()`.
  //
  // Trade-off: stricter authoring rules, but every page now ships an instant
  // static shell and streams only the genuinely dynamic holes. See
  // /partial-prerendering for the canonical static-shell + cached + dynamic mix.
  // ---------------------------------------------------------------------------
  cacheComponents: true,
};

export default nextConfig;
