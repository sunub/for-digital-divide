'use server';

import { redirect } from 'next/navigation';
import { deleteSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';

export async function logoutAction() {
  await deleteSessionCookieStorage('en_session');
  redirect('/login');
}
