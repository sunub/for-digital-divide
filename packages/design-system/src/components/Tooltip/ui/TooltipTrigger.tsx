"use client";

import {
  Button,
  type NativeButtonProps,
} from "../../Button";
import clsx from "clsx";
import { useState } from "react";
import { useTooltipToggle } from "../hooks/useTooltipToggle";
import { useTooltipContext } from "./TooltipProvider";

export type TooltipTriggerProps = NativeButtonProps;

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const { isVisible, handleToggle } = useTooltipToggle();
  const { setTriggerElement } = useTooltipContext();

  function handleTrigger() {
    handleToggle();
  }

  return (
    <Button
      ref={setTriggerElement}
      className={clsx("tooltip-trigger", props.className)}
      onMouseEnter={() => {
        if (timer) {
          clearTimeout(timer);
        }
        setTimer(setTimeout(handleTrigger, 100));
      }}
      onMouseLeave={() => {
        if (timer) {
          clearTimeout(timer);
        }
        if (isVisible) {
          handleTrigger();
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
