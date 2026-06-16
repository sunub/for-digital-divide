import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Device } from "@/shared/layout";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { LoginContentContainer } from "./LoginContentContainer";
import { OnboardingGuide } from "./OnboardingGuide";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; reason?: string }>;
}) {
  const { reason, step } = (await searchParams) || {};
  const deviceCookie = await getPermanentCookieStorage("en_device");
  const hasPinLoginAvailable = Boolean(deviceCookie?.device_id);

  return (
    <Grid className={gridLayout}>
      {/* left panel */}
      <OnboardingGuide step={step} />

      {/* right panel */}
      <Device.Frame>
        <Device.Content>
          <LoginContentContainer
            hasPinLoginAvailable={hasPinLoginAvailable}
            reason={reason}
          />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
