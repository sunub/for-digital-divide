"use client";

import { Box } from "@for-digital-divide/design-system";
import { vars } from "@for-digital-divide/design-system/styles";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, Ref } from "react";
import { useContext } from "react";
import { InstructionListContext } from "./InstructionContext";
import * as styles from "./InstructionItem.css";

export interface InstructionItemProps
  extends ComponentPropsWithoutRef<typeof Box> {
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
    <Box
      ref={ref}
      as="li"
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
      <div className={styles.stepIndicator}>{step}</div>
      <span className={styles.stepText}>{children}</span>
    </Box>
  );
}
