'use client';
// import Link from "next/link";
import { useState } from 'react';

// static — the
// server side

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function StateComponent(props: Props) {
  const [state] = useState(1);

  const files = props?.files || 'nothing';

  return (
    <div>
      <h1>
        Hello from a client component, the state is {state}{' '}
        {new Date().toLocaleTimeString()}
      </h1>
      ;<p>Some props form a Server component: {files}</p>
    </div>
  );
}
