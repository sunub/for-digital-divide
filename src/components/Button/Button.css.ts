import { createVar, fallbackVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/style/theme.css";

export const buttonPaddingVar = createVar();
export const buttonCursorVar = createVar();

export const buttonRecipe = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    cursor: fallbackVar(buttonCursorVar, "pointer"),
    borderRadius: "12px",
    fontWeight: "500",
    transitionProperty:
      "background-color, box-shadow, border-color, color, transform, outline",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    willChange: "transform, box-shadow, opacity",
    outline: "none",
    selectors: {
      "&:focus-visible": {
        outline: `4px solid oklch(75.57% 0.19 288.17)`,
      },
      "&:focus-within": {
        boxShadow: `0 0 0 2px ${vars.color.background}, 0 0 0 6px ${vars.color.ring}`,
      },
      "&:disabled": {
        pointerEvents: "none",
        opacity: 0.5,
      },
      "&:active": {
        outline: `4px solid oklch(75.57% 0.19 288.17)`,
        transform: "scale(1.02)",
      },
    },
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.button,
        selectors: {
          "&:hover": {
            color: vars.color.buttonActiveForeground,
            backgroundColor: vars.color.buttonActive,
          },
        },
      },
      deep: {
        backgroundColor: vars.color.buttonDefault,
        color: vars.color.buttonDefaultForeground,
        fontSize: "1.125rem",
        lineHeight: "1.75rem",
        selectors: {
          "&:hover": {
            color: vars.color.buttonActiveForeground,
            backgroundColor: vars.color.buttonActive,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.55)",
          },
        },
      },
      transparent: {
        boxShadow: "none",
        backgroundColor: "transparent",
        color: vars.color.buttonDefaultForeground,
      },
      destructive: {
        backgroundColor: vars.color.buttonDestructive,
        color: vars.color.buttonDestructiveForeground,
        selectors: {
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.55)",
            backgroundColor: vars.color.destructiveActive,
            color: vars.color.destructiveActiveForeground,
          },
        },
      },
    },
    size: {
      default: {
        width: "fit-content",
        height: "fit-content",
        padding: fallbackVar(buttonPaddingVar, "0.5rem 1rem"),
      },
      wide: {
        padding: fallbackVar(buttonPaddingVar, "1.25rem 6rem"),
      },
      sm: {
        height: "1.75rem",
        borderRadius: "0.375rem",
        padding: fallbackVar(buttonPaddingVar, "0 0.75rem"),
      },
      lg: {
        height: "2.75rem",
        borderRadius: "0.375rem",
        padding: fallbackVar(buttonPaddingVar, "0 2rem"),
      },
      pill: {
        padding: fallbackVar(buttonPaddingVar, "0.75rem 3rem"),
        lineHeight: "0.75rem",
      },
      icon: {
        height: "2.5rem",
        width: "2.5rem",
      },
    },
    font: {
      default: { fontSize: "1rem" },
      xs: { fontSize: "0.75rem" },
      sm: { fontSize: "0.875rem" },
      lg: { fontSize: "1.125rem" },
      xl: { fontSize: "1.25rem" },
      xxl: { fontSize: "1.5rem" },
      xxxl: { fontSize: "1.875rem" },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
