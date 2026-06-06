import { pinLoginAction } from "@/app/login/Pin/utils/pinLoginAction";
import { Pin } from "@/components/Pin";
import { NumpadProvider } from "@/context/NumpadContext";
import { Device } from "@/shared/layout";
import { getKeypadData } from "@/shared/utils/getKeypadData";

export async function LoginPinPage() {
  const registerPadInfo = await getKeypadData();

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
