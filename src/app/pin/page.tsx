import React from 'react';
import { NumpadProvider } from './KeypadProvider';
import PinInput from './PinInput';
import registerAction from './register';
import confirmAction from './confirm';
import { revalidateTag } from 'next/cache';
import PinNumpad from './PinNumpad';
import * as v from 'valibot';

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
      <PinInput
        key={'register-pin-number'}
        uses={'register'}
        padInfo={registerPadInfo}
        action={registerAction}
      >
        <PinNumpad
          key={'register-pin-number'}
          uses={'register'}
          padInfo={registerPadInfo}
        />
      </PinInput>
      <PinInput
        key={'confirm-pin-number'}
        uses={'confirm'}
        padInfo={confrimPadInfo}
        action={confirmAction}
      >
        <PinNumpad
          key={'confirm-pin-number'}
          uses={'confirm'}
          padInfo={confrimPadInfo}
        />
      </PinInput>
    </NumpadProvider>
  );
}

export default Page;

// action={async (formData: FormData) => {
//   let pinNumbers = formData.get('pinNumbers');
//   if (!pinNumbers)
//     return setPinErrorStatus({
//       hasError: true,
//       errorId: 'pin-pattern-input',
//       msg: '핀번호를 입력해주세요.',
//     });

//   const decodedPinNumbers = (pinNumbers as string).split(',');
//   const actionData = await action(decodedPinNumbers, padInfo);

//   if (decodedPinNumbers.length !== validNumpadLength) {
//     setPinErrorStatus({
//       hasError: true,
//       errorId: 'pin-pattern-input',
//       msg: '핀번호는 4자여야 합니다.',
//     });
//   }

//   if (actionData.status === 'error' && actionData.msg) {
//     setPinErrorStatus({
//       hasError: true,
//       errorId: 'pin-pattern-input',
//       msg: actionData.msg,
//     });
//   }
// }}
