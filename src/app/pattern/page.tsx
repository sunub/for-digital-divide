'use client';

import React from 'react';
import Lock from './lock';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';

function Page() {
  const [update, forceUpdate] = React.useState(false);

  return (
    <>
      <button
        className="absolute top-[50px] left-[45%] p-4 bg-indigo-400 rounded-md"
        onClick={() => forceUpdate(!update)}
      >
        Toggle
      </button>
      <DeviceFrame>
        <DeviceContent>
          <Lock />
        </DeviceContent>
      </DeviceFrame>
    </>
  );
}

export default Page;
