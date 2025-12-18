import { Pin } from "@/components/Pin";
import { NumpadProvider } from "@/context/NumpadContext";
import { Device } from "@/shared/layout";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import * as style from "./page.css";
import { pinRegisterAction } from "./utils/pinRegisterAction";

export default async function RegisterPinPage() {
  const registerPadInfo = await getKeypadData();

  return (
    <NumpadProvider>
      <Pin.registerForm
        action={pinRegisterAction}
        title="핀 번호 등록"
        className={style.registerPinForm}
        description="등록된 핀 번호가 존재하지 않아 핀 번호를 새롭게 등록 해야 합니다"
      >
        <Device.drawerIndicator />
        <Device.drawer>
          <Pin.numpad padInfo={registerPadInfo} />
        </Device.drawer>
      </Pin.registerForm>
    </NumpadProvider>
  );
}
