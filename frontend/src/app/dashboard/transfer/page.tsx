import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import type { Metadata } from "next";
import { Device } from "@/shared/layout";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import { TransferContentContainer } from "./TransferContentContainer";
import { TransferGuide } from "./TransferGuide";

export const metadata: Metadata = { title: "이체" };

export default async function TransferPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = (await searchParams) || {};
  const transferPinPadInfo = await getKeypadData();

  return (
    <Grid className={gridLayout}>
      {/* left panel */}
      <TransferGuide step={step} />

      {/* right panel */}
      <Device.Frame>
        <Device.Content>
          <TransferContentContainer transferPinPadInfo={transferPinPadInfo} />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
