import { cookies } from 'next/headers';

// =============================================================================
// SERVER-SIDE DYNAMIC  (ƒ Dynamic)
// =============================================================================
// Super simple: an async Server Component that awaits cookies(). Reading
// request-time input makes the WHOLE route dynamic — Next re-renders it on every
// request (no build-time HTML). That's why the clock below ticks: it runs per
// request, not at build.
//
// NEXT 16: cookies()/headers()/searchParams/params are async — you must await
// them. (The old synchronous `const c = cookies()` was the upgrade bug.)
//
// No <Suspense> needed: without cacheComponents, a dynamic read just flips the
// route to ƒ. (In the sibling PPR app the same read is wrapped in <Suspense> so
// only that island is dynamic — compare apps/ppr/server-dynamic.)

export default async function ServerDynamic() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '(no theme cookie)';
  console.log('Server Side Dynamic page (runs per REQUEST)');

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Server Side Dynamic</h1>
      <p>
        Rendered per request:{' '}
        <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>
      </p>
      <p>
        theme cookie: <code>{theme}</code>
      </p>
    </div>
  );
}
