"use client";

import * as styles from "../style/layout.css";
import { useDevice } from "./DeviceContext";

export function DeviceDrawer({ children }: { children: React.ReactNode }) {
  const { openDrawer } = useDevice();

  return (
    <div id="drawer-container" className={styles.drawerContainer}>
      <button
        type="button"
        onClick={openDrawer}
        className={styles.drawerOpener}
        aria-label="Open drawer and close content"
      />
      <div id="drawer-content" className={styles.drawerContent}>
        {children}
      </div>
    </div>
  );
}
