// =============================================================================
// A SHARED ("universal") component — NO directive at all.
// =============================================================================
// This is the answer to "how can a component with no 'use client' be both client
// and server rendered?"
//
// A directive doesn't define what a component IS — it defines the BOUNDARY at
// the import site. A module with neither directive is "shared": where it renders
// depends entirely on who imports it.
//   • Imported by a Server Component  → runs on the server (part of the RSC tree).
//   • Imported past a 'use client' boundary → bundled into the client and runs in
//     the browser (and during SSR).
//
// So the SAME source file below is compiled into BOTH bundles in this example:
// the page renders it on the server, and <ClientHost/> renders it on the client.
//
// CONSTRAINT: shared components must be written to run in either place. They may
// NOT use server-only APIs (fs, cookies) NOR client-only hooks (useState,
// useEffect) — because they have to be valid in both. Keep them pure/presentational.

export default function SharedGreeting({ from }: { from: string }) {
  return (
    <p>
      👋 SharedGreeting (no directive) rendered <strong>{from}</strong>.
    </p>
  );
}
