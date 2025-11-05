import React, { Suspense } from 'react';

const StateComponent = React.lazy(() => import('./state-component'));

export const runtime = 'edge';

async function listDemoFiles() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return [
    'src/app/page.tsx',
    'src/app/server-component.tsx',
    'src/app/server-static/page.tsx',
  ];
}

export default async function ServerComponent() {
  console.log('ServerComponent message');
  const env = process.env.NODE_ENV;

  const files = await listDemoFiles();

  return (
    <div>
      <p>Server Component: our NODE_ENV is {env}</p>

      <Suspense fallback={<div>Loading...</div>}>
        <StateComponent files={files} />
      </Suspense>
    </div>
  );
}
