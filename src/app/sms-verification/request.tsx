'use client';

import React, { useEffect } from 'react';
import {
  askPermission,
  getNotificationPermissionState,
} from './lib/permission';
import Cookies from 'js-cookie';
import { redirectToSmsVerification } from './lib/redirect';

function PermissionRequest() {
  useEffect(() => {
    (async () => {
      const hasPermission = await getNotificationPermissionState();
      if (hasPermission === 'granted' || hasPermission === 'denied') return;

      await askPermission();
      Cookies.set('hasRequestedPermission', 'true', {
        expires: 1,
      });
      redirectToSmsVerification();
    })();
  }, []);

  return <React.Fragment />;
}

export default PermissionRequest;
