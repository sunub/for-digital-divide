'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function moveToLoginPage() {
  revalidatePath('/login');
  redirect('/login');
}

export async function moveToPasswordPage() {
  revalidatePath('/login/password');
  redirect('/login/password');
}

export async function moveToSmsVerificationPage() {
  revalidatePath('/start/sms-verification');
  redirect('/start/sms-verification');
}

export async function moveToPatternPage() {
  revalidatePath('/start/pattern');
  redirect('/start/pattern');
}
