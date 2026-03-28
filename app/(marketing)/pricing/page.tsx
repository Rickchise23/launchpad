import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Launchpad — Free tier and Pro. Stripe billing via Clerk.',
};

const authDisabled =
  process.env.LAUNCHPAD_AUTH_DISABLED === '1' ||
  process.env.LAUNCHPAD_AUTH_DISABLED === 'true';

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const showOpenAppCtas = authDisabled || noClerkKey;

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#09090b' }}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <Link href="/" className="text-sm font-bold tracking-tight text-white">
          Launchpad
        </Link>
        <nav className="flex items-center gap-4 text-xs">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            Home
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
            <Link
              href="/sign-up"
              className="px-4 py-2 rounded-xl font-semibold text-xs"
              style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
            >
              Get started
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1 px-6 py-16 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Pricing</h1>
        <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Stripe + Clerk Billing power checkout and subscriptions. Wire your Clerk dashboard to Stripe,
          then gate Pro features in the app.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <h2 className="text-lg font-bold text-white mb-1">Free</h2>
            <p className="text-3xl font-bold text-white mb-4">
              $0<span className="text-sm font-normal text-white/40">/mo</span>
            </p>
            <ul className="text-sm space-y-2 mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <li>1 project focus</li>
              <li>Read-oriented workflows</li>
              <li>Vault in browser (migrate to cloud later)</li>
            </ul>
            {showOpenAppCtas ? (
              <Link
                href="/app"
                className="inline-block w-full text-center py-3 rounded-xl font-semibold text-sm border border-white/10 text-white/80 hover:bg-white/[0.04]"
              >
                Open app
              </Link>
            ) : (
              <Link
                href="/sign-up"
                className="inline-block w-full text-center py-3 rounded-xl font-semibold text-sm border border-white/10 text-white/80 hover:bg-white/[0.04]"
              >
                Start free
              </Link>
            )}
          </div>

          <div
            className="rounded-2xl p-8 border relative overflow-hidden"
            style={{
              background: 'rgba(0,230,118,0.06)',
              borderColor: 'rgba(0,230,118,0.25)',
            }}
          >
            <span
              className="absolute top-4 right-4 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}
            >
              Pro
            </span>
            <h2 className="text-lg font-bold text-white mb-1">Pro</h2>
            <p className="text-3xl font-bold mb-1" style={{ color: '#00e676' }}>
              $9.99<span className="text-sm font-normal text-white/40">/mo</span>
            </p>
            <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Set your Stripe Price ID in env; enforce with Clerk Billing.
            </p>
            <ul className="text-sm space-y-2 mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <li>Unlimited projects & integrations</li>
              <li>Full GitHub / Vercel / Supabase / Claude</li>
              <li>Agent Bay + MCP generator</li>
              <li>Domains panel</li>
            </ul>
            {showOpenAppCtas ? (
              <span
                className="inline-block w-full text-center py-3 rounded-xl font-semibold text-sm opacity-50 cursor-not-allowed"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
              >
                Enable auth for checkout
              </span>
            ) : (
              <Link
                href="/sign-up"
                className="inline-block w-full text-center py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #00e676, #00c853)', color: '#0a0a0a' }}
              >
                Get started — upgrade in app
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
