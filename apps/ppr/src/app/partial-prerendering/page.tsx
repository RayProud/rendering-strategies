import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { cacheLife } from 'next/cache';

// =============================================================================
// PARTIAL PRERENDERING (PPR)  (route legend: ◐ partial — shell + cached + dynamic)
// =============================================================================
// PPR is the headline feature behind `cacheComponents: true`. A single route is
// split into THREE kinds of content, all in one response:
//
//   1. STATIC SHELL — synchronous, request-independent markup. Prerendered at
//      build, served instantly from the CDN. (The <header>/<h1> below.)
//   2. CACHED — async data that doesn't need to be fresh every request. Marked
//      with the `'use cache'` directive + a cacheLife() profile. Rendered once,
//      reused across requests until it revalidates. (<CachedPrice/>.)
//   3. DYNAMIC — genuinely per-request data, wrapped in <Suspense>. Prerendered
//      as a hole (the fallback) and streamed in at request time. (<UserGreeting/>
//      reads cookies(), which is request-time input.)
//
// The browser gets the static shell + cached content immediately, then the
// dynamic holes stream in. No "all or nothing" between static and dynamic.

export default function PartialPrerenderingPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* (1) STATIC SHELL — baked at build time. */}
      <header>
        <h1 className="text-2xl font-semibold">Partial Prerendering</h1>
        <p>Static shell • cached island • dynamic island — one route.</p>
      </header>

      {/* (2) CACHED — rendered once, reused until it revalidates. */}
      <CachedPrice />

      {/* (3) DYNAMIC — streamed per request behind a Suspense boundary. */}
      <Suspense fallback={<p>Loading your greeting…</p>}>
        <UserGreeting />
      </Suspense>
    </div>
  );
}

// CACHED ISLAND. `'use cache'` makes Next memoize this component's output. Note
// it must NOT read cookies()/headers()/searchParams — cached output can't depend
// on per-request input (pass such values in as args instead). cacheLife('minutes')
// picks a built-in stale/revalidate profile.
async function CachedPrice() {
  'use cache';
  cacheLife('minutes');
  // Pretend this is an expensive query. The timestamp shows when the cache
  // entry was produced — it stays put across reloads until revalidation.
  const price = (Math.random() * 100).toFixed(2);
  return (
    <p>
      Cached price: <strong>${price}</strong> (computed once at{' '}
      {new Date().toLocaleTimeString()}, reused until revalidation)
    </p>
  );
}

// DYNAMIC ISLAND. Reads request-time input, so it can't be part of the static
// shell or a cache; it streams in per request.
async function UserGreeting() {
  const cookieStore = await cookies();
  const name = cookieStore.get('name')?.value ?? 'stranger';
  return (
    <p>
      Hello, <strong>{name}</strong> — rendered fresh at{' '}
      {new Date().toLocaleTimeString()} (set a `name` cookie to personalize).
    </p>
  );
}
