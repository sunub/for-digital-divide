"use client";

import { ArrowDownIcon } from "lucide-react";
import { useDevice } from "./DeviceContext";
import * as style from "./DrawerIndicator.css";

export function DrawerIndicator() {
  const { currentView } = useDevice();

  return (
    <div
      className={style.container({ isDrawer: currentView === "drawer" })}
      id="login-pin__drawer-indicator"
    >
      <p>클릭!!</p>
      <div className={style.svgContainer} id="login-pin__drawer-indicator-icon">
        <ArrowDownIcon size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
}
