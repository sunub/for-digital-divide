import React from 'react';
import Pinnumber from './pinnumber';

async function getPadInfo() {
  const baseurl =
    process.env.NODE_ENV === 'production'
      ? 'https://for-digital-divide.vercel.app'
      : 'http://localhost:3000';

  const response = await fetch(`${baseurl}/api/keypad`, {
    next: {
      tags: ['keypad'],
    },
    cache: 'no-store',
  });
  const data = await response.json();
  return data;
}

async function Page() {
  let registerPadInfo = await getPadInfo();

  return <Pinnumber numpad={registerPadInfo} />;
}

export default Page;
