'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { baseurl } from '@/constants/constants';

export default async function submitHandler() {
  revalidatePath(`${baseurl}/pin`);
  redirect(`${baseurl}/pin`);
}
