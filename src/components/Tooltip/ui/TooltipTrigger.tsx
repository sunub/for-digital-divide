"use client";

import clsx from "clsx";
import { useState } from "react";
import { useTooltipToggle } from "../hooks/useTooltipToggle";
import { useTooltipContext } from "./TooltipProvider";
import { Button } from "@for-digital-divide/design-system";
import type { NativeButtonProps } from "@for-digital-divide/design-system";

interface TooltipTriggerProps extends NativeButtonProps {
  children: React.ReactNode;
}

export function TooltipTrigger({ children, ...props }: TooltipTriggerProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
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
