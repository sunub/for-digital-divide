import React from 'react';
import KeyLayout from './Keylayout';
import { NumpadProvider } from './KeypadProvider';
import registerAction from './register';
import confirmAction from './confirm';

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
  const registerPadInfo = await getPadInfo();
  const confrimPadInfo = await getPadInfo();

  return (
    <NumpadProvider>
      <div>
        <KeyLayout
          key={'register-pin-number'}
          uses={'register'}
          padInfo={registerPadInfo}
          action={registerAction}
        />
      </div>
      <div>
        <KeyLayout
          key={'confirm-pin-number'}
          uses={'confirm'}
          padInfo={confrimPadInfo}
          action={confirmAction}
        />
      </div>
    </NumpadProvider>
  );
}

export default Page;
