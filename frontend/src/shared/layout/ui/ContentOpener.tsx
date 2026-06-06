"use client";

import * as styles from "../style/layout.css";
import { useDevice } from "./DeviceContext";

export function ContentOpener() {
  const { closeDrawer } = useDevice();
  return (
    <button
      type="button"
      onClick={closeDrawer}
      className={styles.openr}
      aria-label="Close drawer and open content"
    />
  );
}
