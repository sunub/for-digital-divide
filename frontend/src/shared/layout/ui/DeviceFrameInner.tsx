import clsx from "clsx";
import * as styles from "../style/layout.css";
import { useDevice } from "./DeviceContext";
import { DeviceFooter } from "./DeviceFooter";
import type { DeviceFrameProps } from "./DeviceFrame";

export function DeviceFrameInner({
  children,
  className,
  ...props
}: DeviceFrameProps) {
  const { currentView } = useDevice();

  return (
    <div className={styles.container}>
      <main
        data-view={currentView}
        className={clsx(styles.frame, className)}
        {...props}
      >
        {children}
        <DeviceFooter />
      </main>
    </div>
  );
}
