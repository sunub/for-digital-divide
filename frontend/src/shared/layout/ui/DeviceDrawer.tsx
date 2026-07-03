"use client";

import * as styles from "../style/layout.css";

export function DeviceDrawer({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.drawerContainer}>
      <div className={styles.drawerContent}>{children}</div>
    </div>
  );
}
