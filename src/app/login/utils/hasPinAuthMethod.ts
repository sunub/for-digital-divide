"use server";

import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";

export async function hasPinAuthMethod(provider_uid: string): Promise<boolean> {
  const authMethodInfo =
    await authMethodsService.findByProviderUid(provider_uid);
  const pinAuthMethod = authMethodInfo?.find(
    (method) => method.method === "PIN",
  );
  return (
    pinAuthMethod?.provider_uid?.toLowerCase() === provider_uid.toLowerCase()
  );
}
