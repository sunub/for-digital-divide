"use client";

import { Flex, Box } from "@internal/design-system/primitives";
import { vars } from "@internal/design-system/style";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import { useContext } from "react";
import { InstructionListContext } from "./InstructionContext";
import * as styles from "./InstructionItem.css";

export interface InstructionItemProps
  extends ComponentPropsWithoutRef<typeof Flex> {
  step: number;
  isActive?: boolean;
}

export function InstructionItem({
  step,
  isActive: customIsActive,
  className,
  children,
  style,
  ref,
  ...props
}: InstructionItemProps & { ref?: Ref<HTMLLIElement> }) {
  const context = useContext(InstructionListContext);
  const isActive =
    customIsActive !== undefined
      ? customIsActive
      : context?.activeStep === step;

  const activeBg = vars.color.button;
  const inactiveBg = vars.color.deviceOutline;

  const activeColor = vars.color.white;
  const inactiveColor = vars.color.descriptionText;

  const activeTextColor = vars.color.text;
  const inactiveTextColor = vars.color.descriptionText;

  return (
    <Flex
      ref={ref}
      as="li"
      alignItems="flex-start"
      className={clsx(styles.instructionItem, className)}
      style={{
        ...style,
        ...assignInlineVars({
          [styles.stepBgVar]: isActive ? activeBg : inactiveBg,
          [styles.stepColorVar]: isActive ? activeColor : inactiveColor,
          [styles.stepTextColorVar]: isActive
            ? activeTextColor
            : inactiveTextColor,
        }),
      }}
      {...props}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        className={styles.stepIndicator}
      >
        {step}
      </Flex>
      <Box as="span" className={styles.stepText}>
        {children}
      </Box>
    </Flex>
  );
}
