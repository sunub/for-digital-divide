import { useState, useEffect } from 'react';
import { getPermanentCookieStorage } from '@/utils/cookies/permanentCookieStorage';
import { DeviceIdSchema } from '@/shared/types/cookie';

export function usePinCardLogic() {
  const [hasDeviceId, setHasDeviceId] = useState(false);
  const [pinPath, setPinPath] = useState('#');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const en_device = await getPermanentCookieStorage('en_device');
      const parsedEnDevice = DeviceIdSchema.safeParse(en_device);
      const hasDeviceId = parsedEnDevice.success;

      setHasDeviceId(hasDeviceId);
      setPinPath(hasDeviceId ? '/login?method=pin' : '#');
      setIsLoading(!hasDeviceId);
    })();
  }, []);

  return { hasDeviceId, pinPath, isLoading };
}
