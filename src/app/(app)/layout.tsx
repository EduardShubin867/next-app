'use client';

import { SessionProvider } from 'next-auth/react';

export default function AppLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
