"use client";

import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import * as styles from "./InstructionBox.css";

export interface InstructionBoxProps
  extends ComponentPropsWithoutRef<typeof Flex> {}

export function InstructionBox({
  className,
  ref,
  ...props
}: InstructionBoxProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <Flex
      ref={ref}
      direction="column"
      width="full"
      padding={8}
      className={clsx(styles.instructionBox, className)}
      {...props}
    />
  );
}
