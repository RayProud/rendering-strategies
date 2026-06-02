import { cookies } from 'next/headers';

// =============================================================================
// A reusable async Server Component that reads request-time data.
// =============================================================================
// The single `await cookies()` below is the whole story behind
// /server-static-turned-dynamic: this component is "infectious". Any route that
// renders it inherits a dynamic dependency, because to produce this component's
// output Next.js needs the incoming request's cookies — something that does not
// exist at build time.
//
// NEXT 16: cookies() returns a Promise and must be awaited (was synchronous
// before). And under `cacheComponents`, this read must sit under a <Suspense>
// boundary in whatever parent renders it (see how the parent wraps it).

export default async function DynamicServerComponent() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '(none)';
  console.log('DynamicServerComponent — reads cookies() at request time');

  return (
    <span>
      {' '}
      [dynamic child: read cookie <code>theme={theme}</code> at{' '}
      <time dateTime={new Date().toISOString()} suppressHydrationWarning>
        {new Date().toLocaleTimeString()}
      </time>
      ]
    </span>
  );
}
