import React from 'react';
import { NumpadProvider } from '@/context/NumpadContext';
import { DeviceDrawer } from '@/shared/layout';
import { PinContent } from './PinContent';
import { PinForm } from './PinForm';
import { PinNumpad } from './PinNumpad';
import { ContentOpener } from '@/shared/layout/ui/ContentOpener';
import { DrawerIndicator } from './DrawerIndicator';

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

export default async function RegisterPin() {
  const registerPadInfo = await getPadInfo();

  return (
    <NumpadProvider>
      <PinForm padInfo={registerPadInfo}>
        <ContentOpener />
        <PinContent />
        <DrawerIndicator />
        <DeviceDrawer>
          <PinNumpad padInfo={registerPadInfo} />
        </DeviceDrawer>
      </PinForm>
    </NumpadProvider>
  );
}
