import React from 'react';
import StateComponent from './state-component-client-wrapper';

export const runtime = 'nodejs';

export default async function ServerComponent() {
  console.log('ServerComponent message');
  const env = process.env.NODE_ENV;

  const files = new Array<undefined>();

  return (
    <div>
      <p>Server Component: our NODE_ENV is {env}</p>

      <p>Files from the server component: {files}</p>

      <StateComponent files={files} />
    </div>
  );
}
