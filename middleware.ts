import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const authDisabled =
  process.env.LAUNCHPAD_AUTH_DISABLED === '1' ||
  process.env.LAUNCHPAD_AUTH_DISABLED === 'true';

/** Without a publishable key, Clerk cannot run — skip auth (local/CI build only). Production must set the key. */
const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();

const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/robots.txt',
  '/sitemap.xml',
  '/api/webhooks(.*)',
]);

export default authDisabled || noClerkKey
  ? function passthrough() {
      return NextResponse.next();
    }
  : clerkMiddleware((auth, request) => {
      if (!isPublicRoute(request)) {
        auth().protect();
      }
    });

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
