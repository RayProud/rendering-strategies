// =============================================================================
// WHY 'use server' AT THE TOP OF A PAGE IS A MISTAKE  (ƒ Dynamic)
// =============================================================================
// The old version of this file began with the directive `'use server';`. People
// reach for it thinking "render this page on the server" — but that is not what
// it means. 'use server' marks a file as a SERVER ACTIONS module: every export
// becomes a callable RPC endpoint. Turning your page component into an action is
// nonsensical (and a footgun: the page would be exposed as an action endpoint).
//
// You don't need any directive to render on the server: a plain file IS a Server
// Component. To read request data, just await it. Reading searchParams makes the
// route ƒ dynamic. For REAL server actions, see /server-actions.
//
// NEXT 16: searchParams is a Promise — await it (the old `.toString()` on a
// Promise was the upgrade bug that printed "[object Promise]").

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ServerUseServerExplainer({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  console.log('Server page (NO use server) — correct way to read searchParams');
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        A normal Server Component (no &apos;use server&apos;)
      </h1>
      <p>query params: {JSON.stringify(params)}</p>
      <p className="opacity-60 text-sm">
        Try /server-static-use-server?a=1&amp;b=2
      </p>
    </div>
  );
}
