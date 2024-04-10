'use server';

import { KeypadInfo } from '@/utils/keypad';

export async function getPadInfo(): Promise<KeypadInfo> {
  const baseurl =
    process.env.NODE_ENV === 'production'
      ? 'https://for-digital-divide.vercel.app'
      : 'http://localhost:3000';

  const response = await fetch(`${baseurl}/api/keypad`, {
    cache: 'no-store',
  });
  const data = await response.json();
  return data;
}
