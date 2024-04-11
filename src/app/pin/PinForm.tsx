import { revalidateTag } from 'next/cache';
import { NumpadProvider } from './KeypadProvider';
import registerAction from './register';
import KeyLayout from './PinInput';
import React from 'react';

async function getPadInfo() {
  const baseurl =
    process.env.NODE_ENV === 'production'
      ? 'https://for-digital-divide.vercel.app'
      : 'http://localhost:3000';
  const response = await fetch(`${baseurl}/api/keypad`, {
    next: { tags: ['keypad'] },
    cache: 'no-store',
  });
  return response.json();
}

async function PinForm() {
  const padInfo = await getPadInfo();

  return (
    <NumpadProvider>
      <form
        id="pin-pattern-form"
        action={async (formData: FormData) => {
          'use server';
          const isReorder = formData.get('reorder') === 'on';
          if (isReorder) {
            revalidateTag('keypad');
          }
        }}
      >
        <KeyLayout
          key={'register-pin-number'}
          uses={'register'}
          padInfo={padInfo}
          action={registerAction}
        />
      </form>
    </NumpadProvider>
  );
}

export default PinForm;
