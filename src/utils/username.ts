'use server';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Base64 } from 'js-base64';
import * as v from 'valibot';
import { redirect } from 'next/navigation';
import { baseurl } from '@/constants/constants';
import { revalidatePath } from 'next/cache';

const UsernameSchema = v.object({
  username: v.string('사용자 이름', [
    v.minLength(1, '1글자 이상 입력해주세요.'),
    v.maxLength(40, '40글자 이하로 입력해주세요.'),
  ]),
});

function formAction(formData: FormData) {
  const result = v.safeParse(UsernameSchema, {
    username: formData.get('username'),
  });

  if (!result.success) {
    return NextResponse.json(
      {
        status: 'error',
        message: '사용자 이름이 올바르지 않습니다.',
      },
      {
        status: 400,
      },
    );
  }

  const { username } = result.output;
  const encodedUsername = Base64.encode(username);

  cookies().set('username', encodedUsername, {
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  revalidatePath(`${baseurl}/start`);
  redirect(`${baseurl}/start`);
}

export default formAction;
