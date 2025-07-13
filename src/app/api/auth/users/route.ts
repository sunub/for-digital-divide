'use server';

import { NextResponse } from 'next/server';
import { SessionCookieSchema } from '@/shared/types/cookie';
import { UsersSchema } from '@/entities/users/users.model';
import { userService } from '@/entities/users/users.service';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';

export async function GET() {
  const session = getSessionCookieStorage('en_session');
  if (!session) {
    return NextResponse.json({ message: 'not signed in' }, { status: 401 });
  }
  const parsedSession = SessionCookieSchema.safeParse(session);
  if (!parsedSession.success) {
    console.error('Invalid session:', parsedSession.error);
    return NextResponse.json({ message: 'invalid session' }, { status: 400 });
  }
  const { user_id } = parsedSession.data;
  const userInfo = await userService.findByUserId(user_id);
  const parsedUserInfo = UsersSchema.safeParse(userInfo);
  if (!parsedUserInfo.success) {
    console.error('Invalid user info:', parsedUserInfo.error);
    return NextResponse.json({ message: 'invalid user info' }, { status: 400 });
  }
  return NextResponse.json(parsedUserInfo.data, { status: 200 });
}
