import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import type { Metadata } from "next";
import { Device } from "@/shared/layout";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import { ConfirmPinPhaseGuide } from "./guides/ConfirmPinPhaseGuide";
import { RegisterPinPhaseGuide } from "./guides/RegisterPinPhaseGuide";
import { RegisterPhase } from "./RegisterPhase";
import { LoginPinPage } from "./ui/LoginPinPage";

type PageProps = {
  searchParams: Promise<{ phase?: string }>;
};

export const metadata: Metadata = { title: "간편 비밀번호 등록" };

export default async function RegisterPinPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const phase = searchParams?.phase || "register";
  const registerPadInfo = await getKeypadData();

  return (
    <Grid className={gridLayout}>
      {phase === "confirm" ? (
        <ConfirmPinPhaseGuide />
      ) : (
        <RegisterPinPhaseGuide />
      )}
      <Device.Frame defaultView="drawer">
        <Device.Content>
          {phase === "confirm" ? (
            <LoginPinPage />
          ) : (
            <RegisterPhase registerPadInfo={registerPadInfo} />
          )}
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
