'use server';

import { z } from 'zod';
import { parseWithZod } from '@conform-to/zod';
import { Base64 } from 'js-base64';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, '1글자 이상 입력해주세요.')
    .max(40, '40글자 이하로 입력해주세요.'),
});

async function usernameAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: usernameSchema,
  });

  if (submission.status === 'error') {
    return submission.reply();
  }

  const { username } = submission.payload;
  const encodedUsername = Base64.encode(username as string);

  cookies().set('username', encodedUsername, {
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  revalidatePath('/start');
  redirect(`/start`);
}

export default usernameAction;
