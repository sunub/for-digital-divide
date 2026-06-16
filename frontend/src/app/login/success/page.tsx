import { Grid } from "@internal/design-system/primitives";
import { Device } from "@/shared/layout";
import SuccessStep from "./SuccessStep";

export default function SuccessPage() {
  return (
    <Grid placeContent="center">
      <Device.Frame>
        <Device.Content>
          <SuccessStep />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
