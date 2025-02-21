'use client';

import React from 'react';
import Lock from './lock';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';

function Page() {
  return (
    <DeviceFrame>
      <DeviceContent>
        <Lock />
      </DeviceContent>
    </DeviceFrame>
  );
}

export default Page;
