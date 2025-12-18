"use server";

import { unstable_cache } from "next/cache";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { DeviceIdSchema } from "@/shared/types/cookie";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";

const getCachedAuthMethods = unstable_cache(
  async (provider_uid: string) => {
    return authMethodsService.findByProviderUid(provider_uid);
  },
  ["dashboard-auth-methods"],
  { tags: ["auth-methods"] },
);

export async function getPinAvailable() {
  const deviceId = await getPermanentCookieStorage("en_device");
  const parsedDeviceId = DeviceIdSchema.safeParse(deviceId);
  if (!parsedDeviceId.success) {
    return false;
  }

  const registeredAuthMethod = await getCachedAuthMethods(
    parsedDeviceId.data.device_id,
  );
  const pinMethod = registeredAuthMethod.find((info) => info.method === "PIN");
  return pinMethod?.provider_uid === parsedDeviceId.data.device_id;
}
