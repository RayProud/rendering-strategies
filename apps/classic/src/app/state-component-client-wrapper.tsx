'use client';

// =============================================================================
// The "wrap a third-party component to use it on the client" pattern.
// =============================================================================
// Imagine StateComponent comes from a library that forgot to add 'use client'
// (or is intentionally agnostic). You can't add the directive to someone else's
// file, and importing it directly from a Server Component would try to render it
// on the server. This thin wrapper — which DOES declare 'use client' — is the
// boundary. Importing the library component past this boundary bundles it into
// the client, giving it access to hooks/state.
//
// This is exactly how you'd expose, say, a context Provider from a library that
// ships without a directive: wrap it once in your own 'use client' file.

import StateComponent from './state-component';

type Props = {
  files?: string[];
};

export default function Wrapper(props: Props) {
  return <StateComponent {...props} />;
}
