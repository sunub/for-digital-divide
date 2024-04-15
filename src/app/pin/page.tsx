import React from 'react';
import { NumpadProvider } from '@/context/NumpadContext';
import PinInput from '@/components/PinNumber/PinInput';
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
      <Device
        mainContent={
          <React.Fragment>
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
          </React.Fragment>
        }
      />
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
