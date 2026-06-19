import { useCallback, useEffect, useState } from "react";
import {
  tooltipTriangleHeightVar,
  tooltipTriangleWidthVar,
} from "../ui/Tooltip.css";

const SPACING = 8;

interface Position {
  top: number;
  left: number;
  triangleTop: number;
}

export function useTooltipPosition(
  triggerElement: HTMLElement | null,
): Position {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [triangleTop, setTriangleTop] = useState(SPACING);

  const updatePosition = useCallback(() => {
    if (!triggerElement) {
      return;
    }

    const box = triggerElement.getBoundingClientRect();

    const newLeft = box.left + box.width / 2;
    const newTop = box.bottom + SPACING;
    const newTriangleTop = -SPACING;

    setLeft(newLeft);
    setTop(newTop);
    setTriangleTop(newTriangleTop);

    document.documentElement.style.setProperty(
      tooltipTriangleWidthVar,
      `${SPACING * 2}px`,
    );
    document.documentElement.style.setProperty(
      tooltipTriangleHeightVar,
      `${SPACING}px`,
    );
  }, [triggerElement]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [updatePosition]);

  return {
    top,
    left,
    triangleTop,
  };
}
