import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const authDisabled =
  process.env.LAUNCHPAD_AUTH_DISABLED === '1' ||
  process.env.LAUNCHPAD_AUTH_DISABLED === 'true';

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

export default function SignUpPage() {
  if (authDisabled || noClerkKey) redirect('/app');
  return (
    <div className="min-h-screen flex flex-col items-center pt-12 px-4 pb-20" style={{ background: '#09090b' }}>
      <Link href="/" className="text-xs text-white/40 hover:text-white/70 mb-8">
        ← Back to home
      </Link>
      <SignUp
        forceRedirectUrl="/app"
        signInUrl="/sign-in"
        appearance={{
          variables: { colorPrimary: '#00e676', colorText: 'rgba(255,255,255,0.9)', colorBackground: '#121214' },
          elements: {
            card: 'bg-[#121214] border border-white/[0.08] shadow-none',
            headerTitle: 'text-white',
            headerSubtitle: 'text-white/50',
            socialButtonsBlockButton: 'border-white/10',
            formButtonPrimary: 'bg-[#00e676] hover:bg-[#00c853] text-[#0a0a0a]',
            footerActionLink: 'text-[#40c4ff]',
          },
        }}
      />
    </div>
  );
}
