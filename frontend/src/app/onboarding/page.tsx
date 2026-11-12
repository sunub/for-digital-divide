import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import type { Metadata } from "next";
import { Device } from "@/shared/layout";
import { OnboardingContentContainer } from "./OnboardingContentContainer";
import { OnboardingGuide } from "./OnboardingGuide";

export const metadata: Metadata = { title: "본인 확인" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = (await searchParams) || {};

  return (
    <Grid className={gridLayout}>
      {/* left panel */}
      <OnboardingGuide step={step} />

      {/* right panel */}
      <Device.Frame>
        <Device.Content>
          <OnboardingContentContainer />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
