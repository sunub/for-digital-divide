import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { z } from "zod/v4";
import { AuthMethodSchema } from "@/entities/auth_methods/auth_methods.model";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import {
  DeviceIdSchema,
  hexIdentifierSchema,
  SessionCookieSchema,
} from "@/entities/cookies/cookies.model";
import { UsersSchema } from "@/entities/users/users.model";
import { userService } from "@/entities/users/users.service";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { getSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";

const SessionUserSchema = UsersSchema.extend({
  user_id: z.number().int().positive(),
  session_id: hexIdentifierSchema.nullable(),
});

export interface AuthSession {
  user_id: number;
  session_id: string;
}

export interface TrustedDevice {
  device_id: string;
  user_id: number;
}

export interface AuthState {
  session: AuthSession | null;
  trustedDevice: TrustedDevice | null;
}

export const getAuthState = cache(async (): Promise<AuthState> => {
  const [sessionCookie, deviceCookie] = await Promise.all([
    getSessionCookieStorage("en_session"),
    getPermanentCookieStorage("en_device"),
  ]);

  let session: AuthSession | null = null;
  const parsedSessionCookie = SessionCookieSchema.safeParse(sessionCookie);
  if (parsedSessionCookie.success && parsedSessionCookie.data.user_id > 0) {
    const userInfo = await userService.findByUserId(
      parsedSessionCookie.data.user_id,
    );
    const parsedUserInfo = SessionUserSchema.safeParse(userInfo);

    if (
      parsedUserInfo.success &&
      parsedUserInfo.data.session_id === parsedSessionCookie.data.session_id
    ) {
      session = {
        user_id: parsedUserInfo.data.user_id,
        session_id: parsedSessionCookie.data.session_id,
      };
    }
  }

  let trustedDevice: TrustedDevice | null = null;
  const parsedDevice = DeviceIdSchema.safeParse(deviceCookie);
  if (parsedDevice.success) {
    const pinMethod = await authMethodsService.findByProviderUidAndMethod(
      parsedDevice.data.device_id,
      "PIN",
    );
    const parsedPinMethod = AuthMethodSchema.safeParse(pinMethod);

    if (parsedPinMethod.success) {
      trustedDevice = {
        device_id: parsedDevice.data.device_id,
        user_id: parsedPinMethod.data.user_id,
      };
    }
  }

  return {
    session,
    trustedDevice,
  };
});

export const requireAuthSession = cache(async () => {
  const { session } = await getAuthState();

  if (!session) {
    redirect("/onboarding");
  }

  return session;
});

export async function hasTrustedPinDeviceForCurrentUser() {
  const { session, trustedDevice } = await getAuthState();

  return Boolean(
    session &&
      trustedDevice &&
      trustedDevice.user_id === session.user_id &&
      trustedDevice.device_id,
  );
}
