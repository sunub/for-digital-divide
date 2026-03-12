"use server";

import { hasTrustedPinDeviceForCurrentUser } from "@/entities/auth/session.server";

export async function getPinAvailable() {
  return hasTrustedPinDeviceForCurrentUser();
}
