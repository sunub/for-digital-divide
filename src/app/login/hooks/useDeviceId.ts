import { useEffect, useState } from "react";
import { DeviceIdSchema } from "@/shared/types/cookie";
import { deletePermanentCookieStorage, getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { hasPinAuthMethod } from "../utils/hasPinAuthMethod";

export function useDeviceId() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasDeviceId, setHasDeviceId] = useState(false);

  useEffect(() => {
    const checkDevice = async () => {
      try {
        const en_device = await getPermanentCookieStorage("en_device");
        const parsedEnDevice = DeviceIdSchema.safeParse(en_device);
        if (!parsedEnDevice.success) {
          return;
        }

        const { device_id } = parsedEnDevice.data;
        if (await hasPinAuthMethod(device_id)) {
          setHasDeviceId(true);
        } else {
          await deletePermanentCookieStorage("en_device");
        }
      } catch (error) {
        console.error("Failed to check device ID:", error);
        setHasDeviceId(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkDevice();
  }, []);

  return { isLoading, hasDeviceId };
}
