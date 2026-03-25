import type { Metadata } from 'next';
import './globals.css';
import { getSiteUrl } from '@/lib/siteUrl';
import { ClerkAppProvider } from '@/components/providers/ClerkAppProvider';

const authDisabled =
  process.env.LAUNCHPAD_AUTH_DISABLED === '1' ||
  process.env.LAUNCHPAD_AUTH_DISABLED === 'true';

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
const skipClerk = authDisabled || noClerkKey;

const siteUrl = getSiteUrl();
const title = 'Launch Pad';
const description =
  'Unified control panel for GitHub, Vercel, Supabase, and Claude—repos, deploys, env vars, data, chat, agent tasks, and MCP configs in one dark UI.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  applicationName: title,
  authors: [{ name: 'Rick Griffith' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {skipClerk ? children : <ClerkAppProvider>{children}</ClerkAppProvider>}
      </body>
    </html>
  );
}
