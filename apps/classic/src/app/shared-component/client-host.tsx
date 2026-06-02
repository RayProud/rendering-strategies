'use client';

// A Client Component that renders the SHARED component. Because SharedGreeting is
// imported past this 'use client' boundary, it gets bundled into the client and
// runs in the browser. We add interactivity (useState) to prove this subtree is
// truly client-side — the shared child happily renders inside it.

import { useState } from 'react';
import SharedGreeting from './shared-greeting';

export default function ClientHost() {
  const [count, setCount] = useState(0);
  return (
    <div className="border rounded p-3">
      <p className="text-sm opacity-70">client boundary ↓</p>
      <SharedGreeting from="on the CLIENT (inside a 'use client' host)" />
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="text-white bg-blue-700 rounded px-3 py-1 text-sm"
      >
        clicked {count} times (proves this ran in the browser)
      </button>
    </div>
  );
}
