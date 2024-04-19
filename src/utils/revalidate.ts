'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export const goToUsername = async () => {
  revalidateTag('/start/username?username-not-found=true');
  redirect('/start/username?username-not-found=true');
};

export const goToHome = async () => {
  revalidateTag('/');
  redirect('/');
};
