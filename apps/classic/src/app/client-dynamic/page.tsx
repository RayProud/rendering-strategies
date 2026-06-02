'use client';

import { Suspense, use } from 'react';

// =============================================================================
// CLIENT-SIDE DYNAMIC  (ƒ Dynamic)
// =============================================================================
// A Client Component that depends on request-time input (searchParams). Two
// Next 16 changes collide here:
//
//   1. `searchParams` is now a Promise (it used to be a plain object). The old
//      code did `searchParams.toString()`, which stringified the Promise →
//      "[object Promise]" — the upgrade bug the build log exposed:
//          Client Side Dynamic page  Promise { {} }
//
//   2. A Client Component can't be `async`, so you can't `await` the promise.
//      Unwrap it with React's `use()` hook instead. `use(promise)` suspends the
//      component until it resolves, so it must live under a <Suspense> boundary
//      (that's a React requirement for use(), independent of any Next config).

type SearchParams = { [key: string]: string | string[] | undefined };

export default function ClientDynamic({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  console.log('Client Side Dynamic page (shell)');
  return (
    <div>
      <h1>Client Side Dynamic page</h1>
      <Suspense fallback={<p>Reading ?query…</p>}>
        <Query searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// `use()` unwraps the promise on the client. Try visiting /client-dynamic?a=1&b=2
function Query({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = use(searchParams);
  return <p>query params: {JSON.stringify(params)}</p>;
}
