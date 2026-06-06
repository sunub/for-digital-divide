"use client";

import * as style from "./DashboardContent.css";

export function DashboardContent({ children }: { children?: React.ReactNode }) {
  return <div className={style.dashboardRootContainer}>{children}</div>;
}
