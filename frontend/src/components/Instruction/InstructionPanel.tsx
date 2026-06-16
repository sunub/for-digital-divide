"use client";

import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import * as styles from "./InstructionPanel.css";

export interface InstructionPanelProps
  extends ComponentPropsWithoutRef<typeof Flex> {}

export function InstructionPanel({
  className,
  ref,
  ...props
}: InstructionPanelProps & { ref?: Ref<HTMLDivElement> }) {
  return (
    <Flex
      ref={ref}
      direction="column"
      width="full"
      height="full"
      position="relative"
      justifyContent="center"
      className={clsx(styles.panel, className)}
      {...props}
    />
  );
}
