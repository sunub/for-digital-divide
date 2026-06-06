import { Grid } from "@for-digital-divide/design-system";
import { Suspense } from "react";
import { Tooltip } from "@/components/Tooltip";
import { requireAuthSession } from "@/entities/auth/session.server";
import { Device } from "@/shared/layout";
import * as style from "./layout.css";
import { TransitionLayout } from "./TransitionLayout";
import { DashboardHeader } from "./ui/Dashboard/ui/DashboardHeader/DashboardHeader";

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  await requireAuthSession();

  return (
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
            <TransitionLayout modal={modal}>{children}</TransitionLayout>
          </Grid>
        </Device.Content>
      </Device.Frame>
      <div id="tooltip-root" />
    </Tooltip.Provider>
  );
}
