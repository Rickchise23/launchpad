'use client';

import dynamic from 'next/dynamic';
import LandingPage from '@/components/LandingPage';

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

const HomeAuthenticated = dynamic(() => import('@/components/HomeAuthenticated'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#09090b' }}>
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: '#00e676', borderTopColor: 'transparent' }}
      />
    </div>
  ),
});

export function HomeGate() {
  if (noClerkKey) {
    return <LandingPage />;
  }
  return <HomeAuthenticated />;
}
