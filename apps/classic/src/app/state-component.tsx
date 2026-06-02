'use client';

import { useState } from 'react';

// =============================================================================
// A genuine Client Component (uses useState → needs the client runtime).
// =============================================================================
// It receives `files` (a string[]) as a prop FROM a Server Component. Props that
// cross the server→client boundary must be serializable (plain objects, arrays,
// strings…) — you can't pass a function, a Date instance survives, but e.g. a
// class instance or a server-only handle does not. The array of filenames was
// produced by `fs.readdir` on the server and handed down as data.
//
// (Bug fixed from the original: an array rendered directly as {files} and a
// stray ';' leaked into the markup. We join the array for display instead.)

type Props = {
  files?: string[];
};

export default function StateComponent({ files }: Props) {
  const [state] = useState(1);
  const list = files?.length ? files.join(', ') : 'nothing';

  return (
    <div>
      <h1>
        Hello from a client component, the state is {state}{' '}
        <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>
      </h1>
      <p>Some props from a Server Component: {list}</p>
    </div>
  );
}
