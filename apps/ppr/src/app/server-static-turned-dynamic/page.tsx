import { Suspense } from 'react';
import DynamicServerComponent from '@/app/dynamic-server-component';

// Build-time constant (see server-static/page.tsx for why we can't call
// new Date() during a static render under cacheComponents).
const BUILT_AT = new Date().toISOString();

// =============================================================================
// "STATIC SERVER PAGE THAT TURNS DYNAMIC"  (the question you asked about)
// =============================================================================
// This page's own code reads NOTHING request-specific. So why isn't it static?
//
// Because it renders <DynamicServerComponent/>, and THAT child awaits cookies().
// Dynamic-ness propagates UPWARD: to produce HTML for a parent, React must
// render its children; if any child needs request-time data, the parent cannot
// be fully produced at build time. Pre-PPR, a single dynamic descendant flipped
// the ENTIRE route to `ƒ Dynamic` — the whole page re-rendered on every request.
// That is the "contagion to the root" effect, and it surprises people because
// the dynamic API is nowhere in this file.
//
// HOW PPR CONTAINS IT:  wrapping the dynamic child in <Suspense> draws a
// boundary. Everything OUTSIDE the boundary (the heading) still prerenders into
// the static shell; only the subtree INSIDE streams in per request. So instead
// of "one cookie read poisons the whole route", you get "static shell + a small
// dynamic hole". The blast radius is now exactly the Suspense subtree.
//
// Try it: remove the <Suspense> wrapper and run `next build` — with
// cacheComponents on you'll get a build error telling you an uncached dynamic
// read escaped to the route level.

export default function ServerStaticTurnedDynamic() {
  console.log('\nStatic Server Side Turned Dynamic page (shell at build)');
  return (
    <div>
      <h1>
        I was meant to be a static server page. My heading is still static —{' '}
        <time dateTime={BUILT_AT}>{BUILT_AT} (frozen at build)</time>
        {/* The dynamic child is contained behind a Suspense boundary so it can
            no longer turn the whole route dynamic — only this island is. */}
        <Suspense fallback={<span> [loading dynamic child…]</span>}>
          <DynamicServerComponent />
        </Suspense>
      </h1>
    </div>
  );
}
