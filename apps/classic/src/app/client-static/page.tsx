'use client';

// =============================================================================
// CLIENT-SIDE STATIC  (route legend: ○ Static)
// =============================================================================
// The 'use client' directive marks this module (and everything it imports that
// isn't already a server module) as part of the CLIENT bundle. But "client" is
// NOT the opposite of "static": this page is still PRERENDERED on the server at
// build time, and the resulting HTML is served statically. The difference vs a
// Server Component is that the component's JS is ALSO shipped to the browser and
// hydrated, so it can use hooks (useState/useEffect), event handlers and browser
// APIs.
//
// Lifecycle of a 'use client' component:
//   1. build/server: rendered to HTML (SSR) — note this console.log fires during
//      `next build` too, because the server runs client components once to
//      produce the initial markup.
//   2. browser: the same component hydrates and becomes interactive.
//
// Because it reads nothing request-specific, the prerendered HTML is reusable
// for everyone → ○ Static.

export default function Client() {
  console.log('Client Side Static page (SSR at build, then hydrates)');
  return (
    <div>
      <h1>this is a client only page</h1>
    </div>
  );
}
