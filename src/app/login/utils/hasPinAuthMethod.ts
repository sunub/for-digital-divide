'use server';

import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';

export async function hasPinAuthMethod(device_id: string): Promise<boolean> {
  const authMethodInfo = await authMethodsService.findByDeviceId(device_id);
  const pinAuthMethod = authMethodInfo?.find((method) => method.method === 'PIN');
  return pinAuthMethod?.provider_uid === device_id;
}
