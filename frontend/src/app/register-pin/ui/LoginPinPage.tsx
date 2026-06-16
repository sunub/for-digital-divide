import { pinLoginAction } from "@/app/onboarding/Pin/utils/pinLoginAction";
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
        title="간편 비밀번호 확인"
        description="방금 입력하신 6자리 핀 번호를 다시 한번 입력해 주세요."
      >
        <Device.DrawerIndicator />
        <Device.Drawer>
          <Pin.numpad padInfo={registerPadInfo} />
        </Device.Drawer>
      </Pin.form>
    </NumpadProvider>
  );
}
