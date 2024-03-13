'use client';

import React from 'react';
import Button from '@/components/Button/Button';
import {
  askPermission,
  getNotificationPermissionState,
} from './lib/permission';
import { subscribeUserToPush } from './lib/push';
import { generateVAPIDKeys } from './lib/keys';
import Form from './form';
import Device from '@/components/Device';

function Page() {
  React.useEffect(() => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/worker/sw.js').then((registration) => {
    //     console.log(
    //       'Service Worker registered with scope:',
    //       registration.scope,
    //     );
    //   });
    // }
    (async () => {})();
  }, []);

  React.useEffect(() => {
    (async () => {
      const vapidKey = await generateVAPIDKeys();
      console.log(vapidKey);
      // const subscription = await subscribeUserToPush();
      // console.log(subscription);
    })();
  }, []);

  return (
    <Device
      headerContent={
        <h1 className="text-4xl font-bold">Service Worker and PushManager</h1>
      }
      mainContent={<Form />}
    />
  );
}

export default Page;

{
  /* <Button
  onClick={async () => {
    const permission = await askPermission();
    if (permission === 'granted') {
      console.log('Permission granted');
    }
  }}
>
  권한 요청
</Button> */
}
