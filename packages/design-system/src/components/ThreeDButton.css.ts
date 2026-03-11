import { createVar, style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../tokens/theme.css";

const toneVars = {
  border: createVar(),
  surface: createVar(),
  edgeGradient: createVar(),
  text: createVar(),
};

export const rootClass = style({
  boxSizing: "border-box",
  display: "inline-block",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  appearance: "none",
  borderRadius: vars.borderRadius.md,
  position: "relative",
  WebkitTapHighlightColor: "transparent",
  outlineOffset: "4px",
  height: "fit-content",
  fontSize: vars.fontSize["1.5rem"],
  fontFamily: "inherit",
  color: "inherit",
  textAlign: "inherit",
  transition: "width 100ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  selectors: {
    "&:focus:not(:focus-visible)": {
      outline: "none",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.72,
    },
  },
});

export const shellClass = style({
  boxSizing: "border-box",
  position: "relative",
  display: "inline-block",
  minWidth: vars.size.button,
});

export const frontClass = style({
  boxSizing: "border-box",
  position: "relative",
  display: "inline-flex",
  padding: "0 1rem",
  height: "3rem",
  minWidth: vars.size.button,
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontWeight: vars.fontWeight.bold,
  borderRadius: "1rem",
  backgroundColor: toneVars.surface,
  color: toneVars.text,
  border: `5px solid ${toneVars.border}`,
  userSelect: "none",
  willChange: "transform",
  transform: "translateY(-6px)",
  transition: "all 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  lineHeight: "calc(16px + 24px)",
  textDecoration: "none",
  selectors: {
    [`${rootClass}:hover:not(:disabled) &`]: {
      transform: "translateY(-12px)",
    },
    [`${rootClass}:active:not(:disabled) &`]: {
      transform: "translateY(-2px)",
    },
    [`${rootClass}[data-pressed='true'] &`]: {
      transform: "translateY(-2px)",
    },
  },
});

export const shadowClass = style({
  boxSizing: "border-box",
  pointerEvents: "none",
  userSelect: "none",
  display: "block",
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: "3px",
  borderRadius: "1rem",
  backgroundColor: "oklch(0% 0 14.09 / 25%)",
  transition: "transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  filter: "blur(2px)",
  transform: "translateY(6px)",
  selectors: {
    [`${rootClass}:hover:not(:focus):not(:disabled) &`]: {
      transform: "translateY(6px)",
      transition: "transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
    },
    [`${rootClass}[data-pressed='true'] &`]: {
      transform: "translateY(2px)",
      transition: "transform 340ms",
    },
  },
});

export const edgeClass = style({
  boxSizing: "border-box",
  pointerEvents: "none",
  userSelect: "none",
  display: "block",
  position: "absolute",
  left: 0,
  top: "3px",
  width: "100%",
  height: "100%",
  borderTopLeftRadius: "30px",
  borderTopRightRadius: "30px",
  borderBottomRightRadius: vars.borderRadius.md,
  borderBottomLeftRadius: vars.borderRadius.md,
  backgroundImage: toneVars.edgeGradient,
});

export const dotClass = recipe({
  base: {
    width: "0.25rem",
    height: "0.25rem",
    display: "block",
    borderRadius: vars.borderRadius.full,
    position: "absolute",
    transformOrigin: "center 2rem",
    transition: "transform 100ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  },
  variants: {
    status: {
      pending: {
        visibility: "visible",
        opacity: 1,
        width: "1rem",
        height: "1rem",
      },
      idle: { visibility: "hidden", opacity: 0 },
    },
    type: {
      upper: { backgroundColor: vars.color.text },
      lower: {
        backgroundColor: vars.color.shadowOutline,
        mixBlendMode: "exclusion",
        filter: "blur(2px)",
      },
    },
  },
});

export const buttonRecipe = recipe({
  base: rootClass,
  variants: {
    variant: {
      default: {
        vars: {
          [toneVars.border]: vars.color.button,
          [toneVars.surface]: vars.color.buttonDefault,
          [toneVars.text]: vars.color.buttonDefaultForeground,
          [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.button} 0%, color-mix(in oklch, ${vars.color.button} 70%, white) 9%, color-mix(in oklch, ${vars.color.button} 70%, white) 91%, color-mix(in oklch, ${vars.color.button} 55%, black) 100%)`,
        },
      },
      confirm: {
        vars: {
          [toneVars.surface]: vars.color.buttonConfirm,
          [toneVars.border]: vars.color.buttonConfirmForeground,
          [toneVars.text]: vars.color.buttonConfirmForeground,
          [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.buttonConfirmForeground} 0%, color-mix(in oklch, ${vars.color.buttonConfirm} 88%, white) 9%, color-mix(in oklch, ${vars.color.buttonConfirm} 88%, white) 91%, color-mix(in oklch, ${vars.color.buttonConfirmForeground} 88%, black) 100%)`,
        },
      },
      destructive: {
        vars: {
          [toneVars.border]: vars.color.buttonDestructive,
          [toneVars.surface]: vars.color.buttonDestructive,
          [toneVars.text]: vars.color.buttonDestructiveForeground,
          [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.buttonDestructive} 0%, color-mix(in oklch, ${vars.color.buttonDestructive} 85%, white) 9%, color-mix(in oklch, ${vars.color.buttonDestructive} 85%, white) 91%, color-mix(in oklch, ${vars.color.buttonDestructive} 78%, black) 100%)`,
        },
      },
    },
    status: {
      pending: { pointerEvents: "none" },
      idle: { pointerEvents: "auto" },
    },
  },
  defaultVariants: {
    variant: "default",
    status: "idle",
  },
});

export type ThreeDButtonVariants = RecipeVariants<typeof buttonRecipe>;
