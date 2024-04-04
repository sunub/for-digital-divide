import React from 'react';
import KeyLayout from './Keylayout';
import { NumpadProvider } from './KeypadProvider';

async function getPadInfo() {
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

async function Page() {
  const padInfo = await getPadInfo();
  console.log(padInfo.hash);

  return (
    <NumpadProvider>
      <KeyLayout padInfo={padInfo} />
    </NumpadProvider>
  );
}

export default Page;
