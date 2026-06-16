"use client";

import { useEffect, useState } from "react";
import { pinLoginAction } from "@/app/onboarding/Pin/utils/pinLoginAction";
import { Pin } from "@/components/Pin";
import { NumpadProvider } from "@/context/NumpadContext";
import { Device } from "@/shared/layout";
import type { getKeypadData } from "@/shared/utils/getKeypadData";

type KeypadData = Awaited<ReturnType<typeof getKeypadData>>;

export function LoginPinPage() {
  const [registerPadInfo, setRegisterPadInfo] = useState<KeypadData | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/keypad")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch keypad");
        return res.json();
      })
      .then((data) => setRegisterPadInfo(data))
      .catch((err) => console.error("Keypad fetch error:", err));
  }, []);

  if (!registerPadInfo) {
    return null;
  }

  return (
    <NumpadProvider>
      <Pin.form
        action={pinLoginAction}
        title="핀 번호 로그인"
        description="4자리 핀 번호를 입력해 로그인 해주세요."
      >
        <Device.DrawerIndicator />
        <Device.Drawer>
          <Pin.numpad padInfo={registerPadInfo} />
        </Device.Drawer>
      </Pin.form>
    </NumpadProvider>
  );
}
