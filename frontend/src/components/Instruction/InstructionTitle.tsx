"use client";

import { Box } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import * as styles from "./InstructionTitle.css";

export interface InstructionTitleProps
  extends ComponentPropsWithoutRef<typeof Box> {}

export function InstructionTitle({
  as = "h3",
  className,
  ref,
  ...props
}: InstructionTitleProps & { ref?: Ref<HTMLElement> }) {
  return (
    <Box
      ref={ref}
      as={as}
      className={clsx(styles.instructionTitle, className)}
      {...props}
    />
  );
}
