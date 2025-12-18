import { memo } from "react";
import * as styles from "../style/layout.css";
import { BackButton } from "./buttons/BackButton";
import { HomeButton } from "./buttons/HomeButton";

interface DeviceFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DeviceFooter = memo(
  ({ className, ...props }: DeviceFooterProps) => {
    return (
      <footer
        className={`${styles.deviceFooterContainer} ${className || ""}`}
        {...props}
      >
        <div className={styles.placeCenter({ type: "home" })}>
          <HomeButton href="/" />
        </div>
        <div className={styles.placeCenter({ type: "back" })}>
          <BackButton />
        </div>
      </footer>
    );
  },
);
