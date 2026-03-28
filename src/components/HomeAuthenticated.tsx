'use client';

import { useUser } from '@clerk/nextjs';
import LandingPage from '@/components/LandingPage';
import LaunchPad from '@/components/LaunchPad';

export default function HomeAuthenticated() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#09090b' }}>
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: '#00e676', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return isSignedIn ? <LaunchPad /> : <LandingPage />;
}
