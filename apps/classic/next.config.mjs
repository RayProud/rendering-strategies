/** @type {import('next').NextConfig} */
const nextConfig = {
  // cacheComponents is intentionally OFF in this app.
  //
  // This is the "classic" mental model: routes are either fully static (○),
  // fully dynamic (ƒ), or statically generated (●) — no Partial Prerendering.
  // With the flag off you can use Route Segment Configs like
  // `export const dynamic = 'force-dynamic'` (see /force-dynamic), and a single
  // request-time read (`await cookies()`) makes the WHOLE route ƒ dynamic — no
  // Suspense gymnastics required.
  //
  // The PPR / Cache Components story lives in the sibling app `apps/ppr`, where
  // the flag is ON. The two can't be combined: cacheComponents is global and
  // forbids both `force-dynamic` and unwrapped runtime reads.
};

export default nextConfig;
