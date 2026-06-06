"use server";

import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";

export async function hasPinAuthMethod(provider_uid: string): Promise<boolean> {
  const pinAuthMethod = await authMethodsService.findByProviderUidAndMethod(
    provider_uid,
    "PIN",
  );
  return (
    pinAuthMethod?.provider_uid?.toLowerCase() === provider_uid.toLowerCase()
  );
}
