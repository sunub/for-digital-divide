import { DevicePortalContext } from "@internal/design-system/components";
import clsx from "clsx";
import { useState } from "react";
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
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <DevicePortalContext.Provider value={portalElement}>
      <div className={styles.container}>
        <main
          data-view={currentView}
          className={clsx(styles.frame, className)}
          {...props}
        >
          {children}
          <DeviceFooter />
          <div ref={setPortalElement} className={styles.devicePortalWrapper} />
        </main>
      </div>
    </DevicePortalContext.Provider>
  );
}
