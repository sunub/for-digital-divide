import { useState, useEffect } from 'react';
import { getPermanentCookieStorage } from '@/utils/cookies/permanentCookieStorage';
import { DeviceIdSchema } from '@/shared/types/cookie';

export function useDeviceId() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasDeviceId, setHasDeviceId] = useState(false);

  useEffect(() => {
    const checkDevice = async () => {
      try {
        const en_device = await getPermanentCookieStorage('en_device');
        const parsedEnDevice = DeviceIdSchema.safeParse(en_device);
        setHasDeviceId(parsedEnDevice.success);
      } catch (error) {
        console.error('Failed to check device ID:', error);
        setHasDeviceId(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkDevice();
  }, []);

  return { isLoading, hasDeviceId };
}
