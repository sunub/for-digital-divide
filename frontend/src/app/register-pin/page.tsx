import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Device } from "@/shared/layout";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import { ConfirmPinPhaseGuide } from "./guides/ConfirmPinPhaseGuide";
import { RegisterPinPhaseGuide } from "./guides/RegisterPinPhaseGuide";
import { RegisterPhase } from "./RegisterPhase";
import { LoginPinPage } from "./ui/LoginPinPage";

type PageProps = {
  searchParams: Promise<{ phase?: string }>;
};

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
      <Device.Frame>
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
