'use server';

import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';
import { DeviceIdSchema } from '@/shared/types/cookie';
import { getPermanentCookieStorage } from '@/utils/cookies/permanentCookieStorage';

export async function getPinAvailable() {
  const deviceId = await getPermanentCookieStorage('en_device');
  const parsedDeviceId = DeviceIdSchema.safeParse(deviceId);
  if (!parsedDeviceId.success) {
    return false;
  }

  const registeredAuthMethod = await authMethodsService.findByDeviceId(parsedDeviceId.data.device_id);
  const pinMethod = registeredAuthMethod.filter(info => info.method === 'PIN');
  return pinMethod.length > 0;
}
