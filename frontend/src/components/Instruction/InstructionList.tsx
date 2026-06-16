"use client";

import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import { InstructionListContext } from "./InstructionContext";
import * as styles from "./InstructionList.css";

export interface InstructionListProps
  extends ComponentPropsWithoutRef<typeof Flex> {
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
      <Flex
        ref={ref}
        as={as}
        direction="column"
        padding={0}
        margin={0}
        className={clsx(styles.instructionList, className)}
        {...props}
      >
        {children}
      </Flex>
    </InstructionListContext.Provider>
  );
}
