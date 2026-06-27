import { createVar, keyframes, style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { vars } from "../tokens/theme.css";
import { designSystemLayer } from "../styles/layers.css";

const toneVars = {
  border: createVar(),
  surface: createVar(),
  edgeGradient: createVar(),
  text: createVar(),
};

export const rootClass = style({
  "@layer": {
    [designSystemLayer]: {
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
    },
  },
});

export const shellClass = style({
  "@layer": {
    [designSystemLayer]: {
      boxSizing: "border-box",
      position: "relative",
      display: "inline-block",
      minWidth: vars.size.button,
    },
  },
});

export const frontClass = style({
  "@layer": {
    [designSystemLayer]: {
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
    },
  },
});

export const shadowClass = style({
  "@layer": {
    [designSystemLayer]: {
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
    },
  },
});

export const edgeClass = style({
  "@layer": {
    [designSystemLayer]: {
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
    },
  },
});

export const dotClass = recipe({
  base: {
    "@layer": {
      [designSystemLayer]: {
        width: "0.25rem",
        height: "0.25rem",
        display: "block",
        borderRadius: vars.borderRadius.full,
        position: "absolute",
        transformOrigin: "center 2rem",
        transition: "transform 100ms cubic-bezier(0.3, 0.7, 0.4, 1)",
      },
    },
  },
  variants: {
    status: {
      pending: {
        "@layer": {
          [designSystemLayer]: {
            visibility: "visible",
            opacity: 1,
            width: "1rem",
            height: "1rem",
          },
        },
      },
      idle: {
        "@layer": {
          [designSystemLayer]: {
            visibility: "hidden",
            opacity: 0,
          },
        },
      },
    },
    type: {
      upper: {
        "@layer": {
          [designSystemLayer]: {
            backgroundColor: vars.color.text,
          },
        },
      },
      lower: {
        "@layer": {
          [designSystemLayer]: {
            backgroundColor: vars.color.shadowOutline,
            mixBlendMode: "exclusion",
            filter: "blur(2px)",
          },
        },
      },
    },
  },
});

export const buttonRecipe = recipe({
  base: rootClass,
  variants: {
    variant: {
      default: {
        "@layer": {
          [designSystemLayer]: {
            vars: {
              [toneVars.border]: vars.color.button,
              [toneVars.surface]: vars.color.buttonDefault,
              [toneVars.text]: vars.color.buttonDefaultForeground,
              [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.button} 0%, color-mix(in oklch, ${vars.color.button} 70%, white) 9%, color-mix(in oklch, ${vars.color.button} 70%, white) 91%, color-mix(in oklch, ${vars.color.button} 55%, black) 100%)`,
            },
          },
        },
      },
      confirm: {
        "@layer": {
          [designSystemLayer]: {
            vars: {
              [toneVars.surface]: vars.color.buttonConfirm,
              [toneVars.border]: vars.color.buttonConfirmForeground,
              [toneVars.text]: vars.color.buttonConfirmForeground,
              [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.buttonConfirmForeground} 0%, color-mix(in oklch, ${vars.color.buttonConfirm} 88%, white) 9%, color-mix(in oklch, ${vars.color.buttonConfirm} 88%, white) 91%, color-mix(in oklch, ${vars.color.buttonConfirmForeground} 88%, black) 100%)`,
            },
          },
        },
      },
      destructive: {
        "@layer": {
          [designSystemLayer]: {
            vars: {
              [toneVars.border]: vars.color.buttonDestructive,
              [toneVars.surface]: vars.color.buttonDestructive,
              [toneVars.text]: vars.color.buttonDestructiveForeground,
              [toneVars.edgeGradient]: `linear-gradient(to left, ${vars.color.buttonDestructive} 0%, color-mix(in oklch, ${vars.color.buttonDestructive} 85%, white) 9%, color-mix(in oklch, ${vars.color.buttonDestructive} 85%, white) 91%, color-mix(in oklch, ${vars.color.buttonDestructive} 78%, black) 100%)`,
            },
          },
        },
      },
    },
    status: {
      pending: {
        "@layer": {
          [designSystemLayer]: { pointerEvents: "none" },
        },
      },
      idle: {
        "@layer": {
          [designSystemLayer]: { pointerEvents: "auto" },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    status: "idle",
  },
});

export type ThreeDButtonVariants = RecipeVariants<typeof buttonRecipe>;

export const waveKeyframes = keyframes({
  "0%": {
    transform: "scale(0.95)",
    opacity: 0.3,
    filter: "blur(2px) brightness(1)",
  },
  "50%": {
    transform: "scale(1.22)",
    opacity: 0.95,
    filter: "blur(3px) brightness(1.6) saturate(1.3)",
    boxShadow: `0 0 22px 6px color-mix(in srgb, ${toneVars.border} 90%, transparent),
                0 0 35px 12px color-mix(in srgb, ${toneVars.border} 50%, transparent)`,
  },
  "100%": {
    transform: "scale(1.4)",
    opacity: 0,
    filter: "blur(6px) brightness(1)",
  },
});

export const buttonBorder = style({
  "@layer": {
    [designSystemLayer]: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr",
      justifyItems: "center",
      alignItems: "center",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      transform: "translateY(-0.5px)",
      boxSizing: "border-box",
    },
  },
});

export const wave = recipe({
  base: {
    "@layer": {
      [designSystemLayer]: {
        gridArea: "1 / 1 / 2 / 2",
        width: "calc(100% + 20px)",
        height: "calc(100% + 20px)",
        borderRadius: "30px",
        border: "6px dotted transparent",
        backgroundImage: `linear-gradient(
          90deg,
          color-mix(in srgb, ${toneVars.border} 60%, white) 0%,
          color-mix(in srgb, ${toneVars.border} 80%, white) 22%,
          color-mix(in srgb, ${toneVars.border} 95%, white) 33%,
          color-mix(in srgb, ${toneVars.border} 100%, white) 50%,
          color-mix(in srgb, ${toneVars.border} 95%, white) 67%,
          color-mix(in srgb, ${toneVars.border} 80%, white) 78%,
          color-mix(in srgb, ${toneVars.border} 60%, white) 100%
        )`,
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        opacity: 0,
        transition: "opacity 0.3s ease",
        boxSizing: "border-box",
      },
    },
  },
  variants: {
    highlighting: {
      true: {
        "@layer": {
          [designSystemLayer]: {
            opacity: 1,
            animation: `${waveKeyframes} 1.7s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite`,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    highlighting: false,
  },
});
