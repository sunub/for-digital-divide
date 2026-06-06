"use client";

import { Box } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import { InstructionListContext } from "./InstructionContext";
import * as styles from "./InstructionList.css";

export interface InstructionListProps
  extends ComponentPropsWithoutRef<typeof Box> {
  activeStep?: number;
}

export function InstructionList({
  as = "ul",
  activeStep,
  className,
  children,
  ref,
  ...props
}: InstructionListProps & { ref?: Ref<HTMLUListElement> }) {
  return (
    <InstructionListContext.Provider value={{ activeStep }}>
      <Box
        ref={ref}
        as={as}
        className={clsx(styles.instructionList, className)}
        {...props}
      >
        {children}
      </Box>
    </InstructionListContext.Provider>
  );
}
