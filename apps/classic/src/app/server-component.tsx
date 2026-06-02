// NO directive at the top.
//   • Not 'use client' → this is a Server Component.
//   • Not 'use server' → it is NOT a server action.
// A plain module rendered from the server tree runs ONLY on the server: it can
// touch the filesystem, read env vars, hit a DB — none of which ship to the
// browser. The only thing that reaches the client is the HTML it produced and
// the serializable props it passes to any client component below it.

import { promises as fs } from 'fs';
import StateComponent from './state-component-client-wrapper';

export default async function ServerComponent() {
  console.log('ServerComponent message (server only)');
  const env = process.env.NODE_ENV;

  // Filesystem access — impossible in a client component. Proof this code never
  // ships to the browser.
  const files = await fs.readdir('.');

  return (
    <div>
      <p>Server Component: our NODE_ENV is {env}</p>
      <p>Files visible to the server: {files.join(', ')}</p>

      {/* Crossing into a client component. `files` (a string[]) is serialized
          and sent over the server→client boundary as props. */}
      <StateComponent files={files} />
    </div>
  );
}
