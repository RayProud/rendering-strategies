import { Suspense } from 'react';
import ServerComponent from '@/app/server-component';
import ClientHost from './client-host';
import SharedGreeting from './shared-greeting';

// =============================================================================
// SHARED / "UNIVERSAL" COMPONENTS  (route legend: ◐ shell + server-fs island)
// =============================================================================
// Three things on one page:
//
//   1. <SharedGreeting/> rendered directly here → runs on the SERVER (this page
//      is a Server Component). No JS for it ships to the browser.
//   2. <ClientHost/> ('use client') also renders <SharedGreeting/> → the SAME
//      source is bundled into the CLIENT and runs in the browser.
//   3. <ServerComponent/> reads the filesystem (server-only) and passes data
//      across the boundary into a client component (state-component-client-wrapper).
//
// Together they show: the directive lives at the boundary, not on the component.
// One file, two runtimes.

export default function SharedComponentPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Shared / universal components</h1>

      {/* (1) shared component, rendered on the server */}
      <SharedGreeting from="on the SERVER (rendered by a Server Component)" />

      {/* (2) shared component, rendered on the client */}
      <ClientHost />

      {/* (3) server-only work handed across the boundary as props */}
      <Suspense fallback={<p>Reading filesystem on the server…</p>}>
        <ServerComponent />
      </Suspense>
    </div>
  );
}
