'use server';

import { UsersSchema } from '@/entities/users/users.model';
import { userService } from '@/entities/users/users.service';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';

export async function getUsername() {
  const sessionCookie = await getSessionCookieStorage('en_session');
  if (!sessionCookie) {
    return null;
  }
  const userInfo = await userService.findByUserId(sessionCookie.user_id);
  const parsedUserInfo = UsersSchema.safeParse(userInfo);
  if (!parsedUserInfo.success) {
    console.error('Invalid user info:', parsedUserInfo.error);
    return null;
  }
  return parsedUserInfo.data.name;
}
