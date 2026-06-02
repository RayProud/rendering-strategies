// =============================================================================
// FORCING DYNAMIC WITH A ROUTE SEGMENT CONFIG  (ƒ Dynamic)
// =============================================================================
// Terminology: this is a "Route Segment Config", NOT a directive. Directives are
// the string literals at the very top of a file ('use client' / 'use server' /
// 'use cache'). Route Segment Configs are EXPORTED CONSTS that tune a whole
// route segment. The full set:
//
//   export const dynamic        = 'auto' | 'force-dynamic' | 'error' | 'force-static'
//   export const revalidate     = false | 0 | number
//   export const fetchCache     = 'auto' | 'force-no-store' | ...
//   export const runtime        = 'nodejs' | 'edge'
//   export const dynamicParams  = true | false
//   export const preferredRegion / maxDuration
//
// `dynamic = 'force-dynamic'` opts the route into dynamic rendering even though
// it reads NO request data. Without it this page would be ○ Static (the clock
// would freeze at build). With it, the route is ƒ and re-renders every request —
// the clock ticks. It's the explicit "always render fresh" switch, equivalent to
// the old `getServerSideProps`.
//
// IMPORTANT: Route Segment Configs are INCOMPATIBLE with `cacheComponents`.
// In the PPR app this very line is a build error ("Route segment config
// 'dynamic' is not compatible with nextConfig.cacheComponents"). That's why this
// example lives only in the classic app — under PPR you express the same intent
// with <Suspense> / `connection()` instead.

export const dynamic = 'force-dynamic';

export default function ForceDynamic() {
  console.log('force-dynamic page (runs per REQUEST)');
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">force-dynamic</h1>
      <p>
        No cookies/headers read here, yet this re-renders every request because
        of <code>export const dynamic = &apos;force-dynamic&apos;</code>:
      </p>
      <p>
        <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>
      </p>
    </div>
  );
}
