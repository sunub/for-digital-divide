import React from 'react';
import { NumpadProvider } from '@/context/NumpadContext';
import PinForm from '@/components/PinNumber/PinForm';
import PinNumpad from '@/components/PinNumber/PinNumpad';
import registerAction from '@/utils/pin/register';
import confirmAction from '@/utils/pin/confirm';
import Device from '@/components/Device';

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
  let confrimPadInfo = await getPadInfo();

  return (
    <NumpadProvider>
      <PinForm
        key={'register-pin-number'}
        uses={'register'}
        padInfo={registerPadInfo}
        pinAction={registerAction}
      >
        <PinNumpad
          key={'register-pin-number'}
          uses={'register'}
          padInfo={registerPadInfo}
        />
      </PinForm>
    </NumpadProvider>
  );
}

export default Page;
