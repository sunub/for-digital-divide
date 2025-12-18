"use client";

import clsx from "clsx";
import { useState } from "react";
import type { ButtonProps } from "@/components/Button";
import { Button } from "@/components/Button";
import { useTooltipToggle } from "../hooks/useTooltipToggle";
import { useTooltipContext } from "./TooltipProvider";

interface TooltipTriggerProps extends ButtonProps {
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
