'use client';

import Button from '@/components/Button/Button';
import { usePathname } from 'next/navigation';
import React from 'react';

function Page() {
  const pathName = usePathname();
  const [checkAvailable, setCheckAvailable] = React.useState(true);
  const [permission, setPermission] = React.useState(
    '' as NotificationPermission,
  );
  let content =
    'It looks like the browser supports Service Worker and PushManager.';

  // React.useEffect(() => {
  //   (async () => {
  //     if ('serviceWorker' in navigator) {
  //       navigator.serviceWorker
  //         .register('/worker/sw.js')
  //         .then((registration) => {
  //           console.log(
  //             'Service Worker registered with scope:',
  //             registration.scope,
  //           );
  //         });
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Service Worker and PushManager</h1>
      <p>{content}</p>
      <Button>Register Service Worker</Button>
    </div>
  );
}

export default Page;
// function askingPermission() {
//   return new Promise((resolve, reject) => {
//     const permissionResult = Notification.requestPermission((result) => {
//       resolve(result);
//     });

//     if (permissionResult) {
//       permissionResult.then(resolve, reject);
//     }
//   }).then((permissionResult) => {
//     setPermission(permissionResult as NotificationPermission);
//   });
// }
