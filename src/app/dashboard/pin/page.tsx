import React from 'react';
import { NumpadProvider } from '@/context/NumpadContext';
import { DeviceContent, Drawer } from '@/components/ui/device';
import DeviceForm from '@/components/Device/device-form';
import Content from './content';
import PinPad from './numpad';

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

  return (
    <NumpadProvider>
      <DeviceForm padInfo={registerPadInfo}>
        <DeviceContent>
          <Content />
        </DeviceContent>
        <Drawer>
          <PinPad padInfo={registerPadInfo} />
        </Drawer>
      </DeviceForm>
    </NumpadProvider>
  );
}

export default Page;
