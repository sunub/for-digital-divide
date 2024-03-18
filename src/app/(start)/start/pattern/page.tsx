'use client';

import React from 'react';
import PatternLock from '@/components/PatternLock';
import Device from '@/components/Device';
import Button from '@/components/Button/Button';
import { moveToLoginPage } from '@/lib/revalidate';

function Page() {
  return (
    <Device
      headerContent={<h1 className="text-4xl select-none">PatternLock</h1>}
      mainContent={<PatternLock correctPattern={[]} />}
      footerContent={
        <Button type="button" onClick={() => moveToLoginPage()}>
          확인
        </Button>
      }
    />
  );
}

export default Page;
