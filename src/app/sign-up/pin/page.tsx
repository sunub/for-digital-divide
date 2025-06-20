import React from 'react';
import { NumpadProvider } from '@/context/NumpadContext';
import { DeviceContent, DeviceDrawer, DeviceFrame } from '@/shared/layout';
import { PinContent } from './ui/PinContent';
import { PinForm } from './ui/PinForm';
import { PinNumpad } from './ui/PinNumpad';

async function getPadInfo() {
  const baseurl = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEV_URL;
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
      <PinForm padInfo={registerPadInfo}>
        <DeviceFrame>
          <DeviceContent>
            <PinContent />
          </DeviceContent>
          <DeviceDrawer>
            <PinNumpad padInfo={registerPadInfo} />
          </DeviceDrawer>
        </DeviceFrame>
      </PinForm>
    </NumpadProvider>
  );
}

export default Page;
