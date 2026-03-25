import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Launch Pad — The cockpit for builders',
  description:
    'GitHub, Vercel, Supabase, and Claude in one dark UI. Grant once, build forever.',
};

const authDisabled =
  process.env.LAUNCHPAD_AUTH_DISABLED === '1' ||
  process.env.LAUNCHPAD_AUTH_DISABLED === 'true';

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const showOpenAppCtas = authDisabled || noClerkKey;

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#09090b' }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <span className="text-sm font-bold tracking-tight text-white">Launch Pad</span>
        <nav className="flex items-center gap-4 text-xs">
          <Link href="/pricing" className="text-white/50 hover:text-white transition-colors">
            Pricing
          </Link>
          {showOpenAppCtas ? (
            <Link
              href="/app"
              className="px-4 py-2 rounded-xl font-semibold text-xs"
              style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
            >
              Open app
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="text-white/50 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 rounded-xl font-semibold text-xs"
                style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-2xl mx-auto">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: '#00e676' }}
        >
          Developer cockpit
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          The cockpit for builders who hate backend friction
        </h1>
        <p className="text-base mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
          GitHub, Vercel, Supabase, and Claude — one screen. Env vars, deploys, SQL, agents, and domain
          search without living in the terminal.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          {showOpenAppCtas ? (
            <Link
              href="/app"
              className="px-8 py-3.5 rounded-xl font-semibold text-sm"
              style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
            >
              Open dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-up"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
              >
                Start free
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/80 hover:bg-white/[0.04] transition-colors"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
        {!showOpenAppCtas && (
          <p className="text-[11px] mt-8 max-w-md" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Billing (Stripe) hooks up through Clerk on your dashboard — enable when you&apos;re ready
            in production.
          </p>
        )}
      </main>
    </div>
  );
}
