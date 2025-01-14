'use client';

export const runtime = 'edge';

export default function Client() {
  console.log('Client Side Static page');
  return (
    <div>
      <h1>this is a client only page</h1>
    </div>
  );
}
