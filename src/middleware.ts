// src/middleware.ts

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookieStorage } from './utils/cookies/sessionCookieStorage';

const NEED_TO_AUTHENTICATE_PATHS = ['/dashboard'];

const REDIRECT_REASONS = {
  ALREADY_REGISTERED: 'already-registered',
  EMAIL_NOT_VERIFIED: 'email-not-verified',
  PIN_NOT_VERIFIED: 'pin-not-verified',
} as const;

const isMobile = (userAgent: string | null) => {
  return (
    /Android/i.test(userAgent as string) ||
    /iPhone/i.test(userAgent as string) ||
    /iPad/i.test(userAgent as string) ||
    /iPod/i.test(userAgent as string)
  );
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get('user-agent');

  if (isMobile(userAgent)) {
    const url = req.nextUrl.clone();
    url.pathname = '/mobile';
    return NextResponse.redirect(url);
  }

  if (pathname === '/sign-up/register-user') {
    const sessionCookie = await getSessionCookieStorage('en_session');
    if (sessionCookie && sessionCookie.user_id) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('reason', REDIRECT_REASONS.ALREADY_REGISTERED);
      return NextResponse.redirect(url);
    }
  }

  if (NEED_TO_AUTHENTICATE_PATHS.includes(pathname)) {
    const sessionCookie = (await cookies()).get('en_session');
    if (!sessionCookie) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/sign-up/register-user'],
};
