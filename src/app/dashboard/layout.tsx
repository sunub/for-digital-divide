import { Suspense } from "react";
import { Tooltip } from "@/components/Tooltip";
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
  return (
    <Tooltip.Provider>
      <Device.frame>
        <Device.content>
          <div className={style.dashboardRootContainer}>
            <Suspense fallback={<div>Loading...</div>}>
              <DashboardHeader />
            </Suspense>
            <TransitionLayout modal={modal}>{children}</TransitionLayout>
          </div>
        </Device.content>
      </Device.frame>
      <div id="tooltip-root" />
    </Tooltip.Provider>
  );
}
