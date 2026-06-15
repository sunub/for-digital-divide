import { Grid } from "@internal/design-system/primitives";
import { Device } from "@/shared/layout";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { LoginContentContainer } from "./LoginContentContainer";
import { LoginGuide } from "./LoginGuide";
import * as style from "./page.css";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; reason?: string }>;
}) {
  const { reason, step } = (await searchParams) || {};
  const deviceCookie = await getPermanentCookieStorage("en_device");
  const hasPinLoginAvailable = Boolean(deviceCookie?.device_id);

  return (
    <Grid className={style.gridStyle}>
      {/* left panel */}
      <LoginGuide step={step} />

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
