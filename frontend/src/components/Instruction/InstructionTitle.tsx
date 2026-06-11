"use client";

import { Box } from "@internal/design-system/primitives";
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
      fontWeight="semibold"
      color="text"
      margin={0}
      width="full"
      className={clsx(styles.instructionTitle, className)}
      {...props}
    />
  );
}
