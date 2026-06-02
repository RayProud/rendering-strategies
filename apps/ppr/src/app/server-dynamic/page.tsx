import { Suspense } from 'react';
import { cookies } from 'next/headers';

// =============================================================================
// SERVER-SIDE DYNAMIC  (route legend: ƒ Dynamic shell + streamed hole)
// =============================================================================
// WHAT MAKES A ROUTE DYNAMIC?  Reading request-time input:
//   • await cookies()
//   • await headers()
//   • await searchParams / await params
//   • await connection()  (opt into request time without reading anything)
//   • fetch(..., { cache: 'no-store' })
//
// NEXT 16 BREAKING CHANGE: these used to be synchronous. They now return
// Promises and MUST be awaited. The old code here was `const x = cookies()`,
// which (a) never awaited and (b) under `cacheComponents` is a build error
// unless the read happens inside a <Suspense> boundary.
//
// PPR PATTERN: keep the page itself static (the <h1> below is prerendered into
// the static shell at build time) and push the request-time read into a child
// component wrapped in <Suspense>. Next prerenders everything it can, leaves a
// hole where <CookieClock/> is, and streams that hole in per request. So this
// page is "static shell + one dynamic island", not "100% dynamic".

export default function ServerDynamic() {
  console.log('\nServer Side Dynamic page (static shell renders at build)');
  return (
    <div>
      {/* Static: baked into the shell at build time. */}
      <h1>Server Side Dynamic — static shell + a streamed dynamic island</h1>

      {/* Dynamic island: rendered per request and streamed in. The fallback is
          what ships in the static shell until the real content arrives. */}
      <Suspense fallback={<p>Reading request data…</p>}>
        <CookieClock />
      </Suspense>
    </div>
  );
}

// Async Server Component: awaiting cookies() here is what flags THIS subtree as
// dynamic. Because it sits under <Suspense>, only this island is dynamic — the
// rest of the route still prerenders.
async function CookieClock() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '(no theme cookie set)';
  return (
    <p>
      Rendered at request time:{' '}
      <time dateTime={new Date().toISOString()} suppressHydrationWarning>
        {new Date().toLocaleTimeString()}
      </time>{' '}
      — theme cookie: <code>{theme}</code>
    </p>
  );
}
