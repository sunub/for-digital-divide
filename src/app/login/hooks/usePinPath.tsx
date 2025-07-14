import { useEffect, useState } from 'react';

export function usePinPath() {
  const [pinPath, setPinPath] = useState('/dashboard/login/pin/register');

  useEffect(() => {
    const localDeviceId = localStorage.getItem('deviceId');
    if (localDeviceId) {
      setPinPath('/dashboard/login/pin');
    }
  }, []);

  return pinPath;
}
