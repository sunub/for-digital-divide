'use server';

import { z } from 'zod';
import { Base64 } from 'js-base64';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
  console.log(parsedUsername);
  if (!parsedUsername.success) {
    return {
      status: 'error',
      payload: parsedUsername.error,
    };
  }

  const { username } = parsedUsername.data;
  const encodedUsername = Base64.encode(username as string);
  const cookieStore = await cookies();

  cookieStore.set('username', encodedUsername, {
    secure: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  revalidatePath('/start');
  redirect(`/start`);
}

export default usernameAction;
