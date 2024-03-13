'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { encode, decode } from 'js-base64';
import { cookies } from 'next/headers';
import { generateAuthenticationOptions } from '@simplewebauthn/server';

export async function middleware(request: NextRequest) {
  const nextPath = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent');
  if (
    /Android/i.test(userAgent as string) ||
    /iPhone/i.test(userAgent as string) ||
    /iPad/i.test(userAgent as string) ||
    /iPod/i.test(userAgent as string)
  ) {
    return NextResponse.redirect('/mobile');
  }

  if (nextPath === '/login/password') {
    const session = request.cookies.get('session')?.value as string;
    if (!session) return NextResponse.redirect(new URL('/login', request.url));

    const decodedSession = JSON.parse(decode(session));
    if (decodedSession?.isLogin === false)
      return NextResponse.redirect('/login');

    const options = await generateAuthenticationOptions({
      rpID:
        process.env.NODE_ENV === 'development'
          ? 'localhost'
          : process.env.HOSTNAME,
      allowCredentials: [],
    });

    const sessionValue = {
      ...decodedSession,
      challenge: options.challenge,
    };

    return NextResponse.next();
  } else if (nextPath === '/dashboard') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login/password'],
};
