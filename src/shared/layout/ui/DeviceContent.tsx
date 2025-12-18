"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import * as styles from "../style/layout.css";

interface DeviceContentProps extends HTMLMotionProps<"div"> {
  ref?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export function DeviceContent({
  children,
  ref,
  className,
  ...props
}: DeviceContentProps) {
  return (
    <div className={styles.contentRootWrapper}>
      <motion.div
        {...props}
        ref={ref}
        className={`${styles.contentContainer} ${className || ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
