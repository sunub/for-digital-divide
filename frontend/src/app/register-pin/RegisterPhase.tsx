"use client";

import { useRouter } from "next/navigation";
import { Pin } from "@/components/Pin";
import { NumpadProvider } from "@/context/NumpadContext";
import type { KeypadInfo } from "@/entities/keypad/keypad.model";
import { Device } from "@/shared/layout";
import * as style from "./page.css";
import { pinRegisterAction } from "./utils/pinRegisterAction";

export function RegisterPhase({
  registerPadInfo,
  confirmPath = "/register-pin?phase=confirm",
}: {
  registerPadInfo: KeypadInfo;
  confirmPath?: string;
}) {
  const router = useRouter();

  return (
    <NumpadProvider>
      <Pin.registerForm
        action={pinRegisterAction}
        title="간편 비밀번호 등록"
        className={style.registerPinForm}
        description="사용하실 6자리 핀 번호를 입력해 주세요."
        onSuccess={() => router.replace(confirmPath)}
      >
        <Device.Drawer>
          <Pin.numpad padInfo={registerPadInfo} />
        </Device.Drawer>
      </Pin.registerForm>
    </NumpadProvider>
  );
}
