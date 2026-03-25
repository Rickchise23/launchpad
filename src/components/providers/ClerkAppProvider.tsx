'use client';

import { ClerkProvider } from '@clerk/nextjs';

export function ClerkAppProvider({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
