"use client";

import * as styles from "../style/layout.css";
import { DeviceFooter } from "./DeviceFooter";

interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DeviceFrame({
  children,
  className,
  ...props
}: DeviceFrameProps) {
  return (
    <div className={styles.container}>
      <main className={`${styles.frame} ${className || ""}`} {...props}>
        {children}
        <DeviceFooter />
      </main>
    </div>
  );
}
