"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { useTooltipPosition } from "../hooks/useTooltipPosition";
import * as style from "./Tooltip.css";
import { useTooltipContext } from "./TooltipProvider";

export function TooltipContent({ children }: { children: React.ReactNode }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { triggerElement, isVisible, rootContainerRef } = useTooltipContext();
  const { top, left, triangleTop } = useTooltipPosition(
    triggerElement,
    rootContainerRef.current,
  );
  const isMounted = useIsMounted();
  const safeTop = typeof top === "number" && !Number.isNaN(top) ? top : 0;
  const safeLeft = typeof left === "number" && !Number.isNaN(left) ? left : 0;
  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      ref={tooltipRef}
      className={style.tooltipContent({ isVisible })}
      style={assignInlineVars({
        [style.topVar]: `${safeTop}px`,
        [style.leftVar]: `${safeLeft}px`,
        [style.triangleTopVar]: `${triangleTop}px`,
      })}
    >
      {children}
    </div>,
    document.getElementById("tooltip-root") || document.body,
  );
}
