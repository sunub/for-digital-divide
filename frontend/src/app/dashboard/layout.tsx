import { Tooltip } from "@internal/design-system/components";
import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Suspense } from "react";
import { requireAuthSession } from "@/entities/auth/session.server";
import { Device } from "@/shared/layout";
import { DashboardGuide } from "./DashboardGuide";
import * as style from "./layout.css";
import { TransitionLayout } from "./TransitionLayout";
import { DashboardHeader } from "./ui/Dashboard/ui/DashboardHeader/DashboardHeader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthSession();

  return (
    <div className={gridLayout}>
      <DashboardGuide />
      <Tooltip.Provider>
        <Device.Frame>
          <Device.Content>
            <Grid
              width={"full"}
              height={"full"}
              className={style.dashboardRootContainer}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardHeader />
              </Suspense>
              <TransitionLayout className={style.dashboardContentContainer}>
                {children}
              </TransitionLayout>
            </Grid>
          </Device.Content>
        </Device.Frame>
        <div id="tooltip-root" />
      </Tooltip.Provider>
    </div>
  );
}
