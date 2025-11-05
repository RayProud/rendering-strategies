import type { ReactNode } from 'react';

export const runtime = 'edge';

export default function ServerStaticUseServerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
