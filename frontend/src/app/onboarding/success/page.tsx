import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Device } from "@/shared/layout";
import { SuccessGuide } from "../OnboardingGuide/SuccessGuide";
import SuccessStep from "./SuccessStep";

export default function SuccessPage() {
  return (
    <Grid className={gridLayout}>
      <SuccessGuide />
      <Device.Frame>
        <Device.Content>
          <SuccessStep />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
