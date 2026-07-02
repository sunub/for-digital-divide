import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Device } from "@/shared/layout";
import { TransferContentContainer } from "./TransferContentContainer";
import { TransferGuide } from "./TransferGuide";

export default async function TransferPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = (await searchParams) || {};

  return (
    <Grid className={gridLayout}>
      {/* left panel */}
      <TransferGuide step={step} />

      {/* right panel */}
      <Device.Frame>
        <Device.Content>
          <TransferContentContainer />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
