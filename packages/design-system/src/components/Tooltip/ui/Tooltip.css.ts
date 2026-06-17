import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const topVar = createVar();
export const leftVar = createVar();
export const triangleTopVar = createVar();
export const tooltipTriangleHeightVar = createVar();
export const tooltipTriangleWidthVar = createVar();

export const tooltipContent = recipe({
  base: {
    position: "fixed",
    width: "max-content",
    padding: "4px 8px",
    borderRadius: "0.5rem",
    fontSize: "0.75rem",
    color: "var(--color-background)",
    fontWeight: 500,
    backgroundColor: "var(--color-accent)",

    transform: "translateX(-50%)",
    userSelect: "none",
    zIndex: 9999,

    top: fallbackVar(topVar, "0px"),
    left: fallbackVar(leftVar, "50%"),

    "::before": {
      content: "''",
      position: "absolute",
      top: `calc(${fallbackVar(triangleTopVar, "0px")} + 2px)`,
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "var(--color-accent)",
      width: fallbackVar(tooltipTriangleWidthVar, "16px"),
      height: fallbackVar(tooltipTriangleHeightVar, "8px"),
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
  },
  variants: {
    isVisible: {
      true: {
        opacity: 1,
        animation: "showTooltip 0.2s ease-in-out forwards",
      },
      false: {
        opacity: 0,
        animation: "none",
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});
