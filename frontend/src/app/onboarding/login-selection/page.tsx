import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { RegisterPhase } from "@/app/register-pin/RegisterPhase";
import { RegisterUserForm } from "@/app/sign-up/register-user/RegisterUserForm";
import { Device } from "@/shared/layout";
import type { DeviceView } from "@/shared/layout/ui/DeviceContext";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import EmailPasswordLogin from "../email-password/page";
import { LoginSelection } from "../LoginSelection";
import { parseLoginSelectionParams } from "../LoginSelection/loginSelectionParams";
import { OnboardingGuide } from "../OnboardingGuide";
import { LoginPinPage } from "../Pin";

type PageProps = {
  searchParams: Promise<{
    method?: string | string[];
    step?: string | string[];
  }>;
};

const EMAIL_LOGIN_PATH = "/onboarding/login-selection?method=email&step=login";
const PIN_LOGIN_PATH = "/onboarding/login-selection?method=pin&step=login";

function getGuideStep(
  view: ReturnType<typeof parseLoginSelectionParams>,
): string {
  if (view.view === "selection") {
    return "login-selection";
  }

  return view.method === "email" ? "email-input" : "pin-input";
}

export default async function LoginSelectionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const view = parseLoginSelectionParams(params);
  const isPinStep = view.view === "step" && view.method === "pin";
  const deviceView: DeviceView = isPinStep ? "drawer" : "content";

  return (
    <Grid className={gridLayout}>
      <OnboardingGuide step={getGuideStep(view)} />
      <Device.Frame key={deviceView} defaultView={deviceView}>
        <Device.Content>
          {view.view === "selection" ? (
            <LoginSelection />
          ) : view.method === "email" && view.step === "register" ? (
            <RegisterUserForm redirectTo={EMAIL_LOGIN_PATH} />
          ) : view.method === "email" && view.step === "login" ? (
            <EmailPasswordLogin />
          ) : view.method === "pin" && view.step === "register" ? (
            <RegisterPhase
              registerPadInfo={await getKeypadData()}
              confirmPath={PIN_LOGIN_PATH}
            />
          ) : (
            <LoginPinPage />
          )}
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
