import { Loading, Tooltip } from "@internal/design-system/components";
import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { Device } from "@/shared/layout";
import { DashboardGuide } from "./DashboardGuide";
import * as style from "./layout.css";
import { TransitionLayout } from "./TransitionLayout";

export default function DashboardLoading() {
  return (
    <Grid className={gridLayout}>
      <DashboardGuide />

      <Tooltip.Provider>
        <Device.Frame>
          <Device.Content>
            <Grid
              width={"full"}
              height={"full"}
              className={style.dashboardRootContainer}
            >
              <TransitionLayout className={style.dashboardContentContainer}>
                <Loading aria-label="대시보드 로딩 중" />
              </TransitionLayout>
            </Grid>
          </Device.Content>
        </Device.Frame>
        <div id="tooltip-root" />
      </Tooltip.Provider>
    </Grid>
  );
}
