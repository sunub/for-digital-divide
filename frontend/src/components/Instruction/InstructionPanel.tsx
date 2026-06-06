"use client";

import { Box } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import * as styles from "./InstructionPanel.css";

export interface InstructionPanelProps
  extends ComponentPropsWithoutRef<typeof Box> {}

export function InstructionPanel({
  className,
  ref,
  ...props
}: InstructionPanelProps & { ref?: Ref<HTMLDivElement> }) {
  return <Box ref={ref} className={clsx(styles.panel, className)} {...props} />;
}
