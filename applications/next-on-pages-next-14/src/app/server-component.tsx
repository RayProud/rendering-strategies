import React from 'react';
import { getOptionalRequestContext } from '@cloudflare/next-on-pages';
import StateComponent from './state-component-client-wrapper';

export const runtime = 'edge';

export default async function ServerComponent() {
  console.log('ServerComponent message');
  const context = getOptionalRequestContext();
  const env =
    context?.env?.NEXTJS_ENV ??
    process.env.NEXTJS_ENV ??
    process.env.NODE_ENV ??
    'unknown';

  const files = ['server-component.tsx', 'state-component-client-wrapper.tsx'];

  return (
    <div>
      <p>Server Component: running in the {env} environment</p>

      <p>Files from the server component: {files}</p>

      <StateComponent files={files} />
    </div>
  );
}
