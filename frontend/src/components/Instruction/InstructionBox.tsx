"use client";

import { Box } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import * as styles from "./InstructionBox.css";

export interface InstructionBoxProps
  extends ComponentPropsWithoutRef<typeof Box> {}

export function InstructionBox({
  className,
  ref,
  ...props
}: InstructionBoxProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <Box
      ref={ref}
      className={clsx(styles.instructionBox, className)}
      {...props}
    />
  );
}
