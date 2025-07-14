'use server';

import { z } from 'zod/v4';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { userService } from '@entities/users/users.service';
import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';
import { createCookieStorage } from '@/utils/cookies/createCookieStorage';

const USERNAME_ERROR_MESSAGE = '사용자 이름이 올바르지 않습니다.';
const EMAIL_ERROR_MESSAGE = '이메일 형식이 올바르지 않습니다.';
const PASSWORD_ERROR_MESSAGE = '비밀번호 형식이 올바르지 않습니다.';
const PASSWORD_REGEXES = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];

const formSchema = z.object({
  username: z.string().refine(
    val => {
      if (val.length < 2 || val.length > 20) {
        return false;
      }
      if (!/^[a-zA-Z가-힣]+$/.test(val)) {
        return false;
      }
      return true;
    },
    {
      error: USERNAME_ERROR_MESSAGE,
    }
  ),
  email: z
    .email({
      error: () => ({
        message: EMAIL_ERROR_MESSAGE,
      }),
    })
    .trim(),
  password: z
    .string()
    .trim()
    .refine(
      val => {
        if (val.length < 8 || !PASSWORD_REGEXES.every(regex => regex.test(val))) {
          return false;
        }
        return true;
      },
      { error: PASSWORD_ERROR_MESSAGE }
    ),
});

type FormInput = {
  username: string;
  email: string;
  password: string;
};

async function usernameAction(_: unknown, formData: FormData) {
  const rawUsername = formData.get('username');
  const rawEmail = formData.get('email');
  const rawPassword = formData.get('password');

  const input: FormInput = {
    username: typeof rawUsername === 'string' ? rawUsername : '',
    email: typeof rawEmail === 'string' ? rawEmail : '',
    password: typeof rawPassword === 'string' ? rawPassword : '',
  };

  const parsedFormData = formSchema.safeParse(input);
  if (!parsedFormData.success) {
    return {
      status: 'error',
      payload: parsedFormData.error.issues.map(issue => issue.message),
    };
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('en_session');
  if (sessionCookie) {
    return {
      status: 'success',
      payload: ['기존의 세션이 존재합니다. 새로 가입할 필요가 없습니다.'],
    };
  }

  const { username, email, password } = parsedFormData.data;
  const provider_uid = bcrypt.hashSync(`${Date.now()}-${Math.random()}`, 10);

  const user = await userService.upsertSessionByUsernameAndEmail(username, email);
  await authMethodsService.upsertDataByUserId({
    user_id: user.user_id,
    method: 'PASSWORD',
    credential: bcrypt.hashSync(password, 10),
    provider: 'local',
    provider_uid,
  });

  await createCookieStorage(
    { user_id: user.user_id, provider_uid },
    {
      name: 'rg_token',
    }
  );

  return {
    status: 'success',
    payload: ['사용자 이름이 성공적으로 등록되었습니다.'],
  };
}

export { usernameAction };
