'use server';

import { EncryptJWT, jwtDecrypt } from 'jose';
import { cookies } from 'next/headers';
import { SessionCookieSchema } from '@/shared/types/cookie';

interface CreateSessionCookieStorageOptions {
  name: string;
  secret: string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
}

export async function getSessionCookieStorage(cookieName: string) {
  const cookie = await cookies();
  const token = cookie.get(cookieName);
  if (!token) return null;

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('Session secret is required');
  }

  const buf = Buffer.from(secretKey, 'base64');
  if (buf.length !== 32) {
    throw new Error('Invalid session secret');
  }

  try {
    const { payload } = await jwtDecrypt(token.value, buf);
    const parsedPayload = SessionCookieSchema.safeParse(payload);
    if (!parsedPayload.success) {
      throw new Error('Invalid session cookie payload');
    }
    return parsedPayload.data;
  } catch (error) {
    console.error('Failed to decrypt session cookie:', error);
    return null;
  }
}

export async function deleteSessionCookieStorage(cookieName: string) {
  const cookie = await cookies();
  cookie.delete(cookieName);
}

export async function createSessionCookieStorage(
  data: Record<string, unknown>,
  opts?: CreateSessionCookieStorageOptions,
) {
  const cookie = await cookies();
  if (cookie.has(opts?.name || 'en_session')) {
    await deleteSessionCookieStorage(opts?.name || 'en_session');
  }

  const {
    name = 'en_session',
    secret,
    path = '/',
    domain,
    secure = true,
    sameSite = 'lax',
    maxAge = 60 * 60 * 24,
  } = opts || {};
  const secretKey = process.env.JWT_SECRET || secret;
  if (!secretKey) {
    throw new Error('Session secret is required');
  }

  const buf = Buffer.from(secretKey, 'base64');
  if (buf.length !== 32) {
    throw new Error('Invalid session secret');
  }

  const token = await new EncryptJWT(data)
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .encrypt(buf);

  cookie.set(name, token, {
    path,
    domain,
    secure,
    sameSite,
    maxAge,
    httpOnly: true,
  });
}
