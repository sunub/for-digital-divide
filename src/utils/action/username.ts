'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as jose from 'jose';
import { prisma } from '@root/prisma/prisma';

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, '1글자 이상 입력해주세요.')
    .max(40, '40글자 이하로 입력해주세요.')
    .transform((value) => value.replace(/\s+/g, ' ')),
});

async function usernameAction(currentState: unknown, formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  const parsedUsername = usernameSchema.safeParse(formObject);
  if (!parsedUsername.success) {
    return {
      status: 'error',
      payload: parsedUsername.error,
    };
  }

  const { username } = parsedUsername.data;
  const cookieStore = await cookies();

  const rawSecret = process.env.JWT_SECRET;
  if (!rawSecret) {
    throw new Error('JWT_SECRET 환경 변수가 설정되어 있지 않습니다.');
  }
  console.time('jwt:encrypt');
  const secretKey = Buffer.from(rawSecret, 'base64');
  const sid = await new jose.EncryptJWT({ username })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .encrypt(secretKey);
  console.timeEnd('jwt:encrypt');

  try {
    console.time('prisma:upsert');
    await prisma.userInfo.upsert({
      where: { username },
      create: { username, sessionId: sid },
      update: { sessionId: sid },
    });
    console.timeEnd('prisma:upsert');

    console.time('cookieStore.set');
    cookieStore.set('session_id', sid, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });
    console.timeEnd('cookieStore.set');
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      payload: '사용자 이름을 저장하는 중 오류가 발생했습니다.',
    };
  }

  throw redirect('/dashboard');
}

export default usernameAction;
