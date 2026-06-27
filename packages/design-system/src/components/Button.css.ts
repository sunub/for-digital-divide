import {
  createVar,
  fallbackVar,
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../tokens/theme.css";
import { designSystemLayer } from "../styles/layers.css";

export const buttonPaddingVar = createVar();
export const buttonCursorVar = createVar();
export const buttonFontSizeVar = createVar();
export const lineHeightVar = createVar();

const pendingKeyframes = keyframes({
  "0%, 100%": {
    backgroundColor: "oklch(87.45% 0.064 286.931)",
    boxShadow: "0 6px 4px 0 oklch(76.64% 0.13 292.01 / 80%)",
  },
  "50%": {
    backgroundColor: "oklch(92.86% 0.036 289.07)",
    boxShadow: "0 4px 4px 0 oklch(76.64% 0.13 292.01 / 20%)",
  },
});

export const buttonContentClass = style({
  "@layer": {
    [designSystemLayer]: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      whiteSpace: "nowrap",
    },
  },
});

export const buttonContentHiddenClass = style({
  "@layer": {
    [designSystemLayer]: {
      visibility: "hidden",
    },
  },
});

export const pendingOverlayClass = style({
  "@layer": {
    [designSystemLayer]: {
      position: "relative",
      display: "inline-flex",
      flexDirection: "row",
      height: "100%",
      minHeight: "41px",
      cursor: "progress",
      pointerEvents: "none",
    },
  },
});

globalStyle(`${pendingOverlayClass} > :first-child`, {
  "@layer": {
    [designSystemLayer]: {
      borderTopLeftRadius: "16px",
      borderBottomLeftRadius: "18px",
    },
  },
});

globalStyle(`${pendingOverlayClass} > :last-child`, {
  "@layer": {
    [designSystemLayer]: {
      borderTopRightRadius: "16px",
      borderBottomRightRadius: "18px",
    },
  },
});

export const pendingBottomClass = style({
  "@layer": {
    [designSystemLayer]: {
      position: "absolute",
      zIndex: 1,
      top: "2px",
      left: "-1px",
      width: "102px",
      height: "60px",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "18px",
      borderBottomLeftRadius: "18px",
      background: `linear-gradient(
        90deg,
        oklch(76.64% 0.13 292.01) 0%,
        oklch(87.45% 0.0646 286.931) 6%,
        oklch(87.45% 0.0646 286.931) 91%,
        oklch(76.64% 0.13 292.01) 100%
      )`,
    },
  },
});

const pendingBlockBaseClass = style({
  "@layer": {
    [designSystemLayer]: {
      position: "relative",
      zIndex: 2,
      display: "block",
      height: "100%",
      minHeight: "45px",
      width: "20px",
      willChange: "background-color, box-shadow",
      transform: "translate3d(0, 0, 0)",
      animation: `${pendingKeyframes} 1.5s ease-in infinite`,
      selectors: {
        "&::before": {
          content: "''",
          position: "absolute",
          top: "calc(50% - 4px)",
          left: "calc(50% - 4px)",
          width: "8px",
          height: "8px",
          borderRadius: vars.borderRadius.full,
          backgroundColor: "var(--pending-block-color)",
        },
      },
    },
  },
});

export const pendingBlockVariants = styleVariants({
  first: [
    pendingBlockBaseClass,
    {
      "@layer": {
        [designSystemLayer]: {
          vars: {
            "--pending-block-color": "oklch(92.86% 0.036 289.07)",
          },
          animationDelay: "0.2145s",
        },
      },
    },
  ],
  second: [
    pendingBlockBaseClass,
    {
      "@layer": {
        [designSystemLayer]: {
          vars: {
            "--pending-block-color": "oklch(94.48% 0.028 290.23)",
          },
          animationDelay: "0.4095s",
        },
      },
    },
  ],
  third: [
    pendingBlockBaseClass,
    {
      "@layer": {
        [designSystemLayer]: {
          vars: {
            "--pending-block-color": "oklch(92.86% 0.036 289.07)",
          },
          animationDelay: "0.6045s",
        },
      },
    },
  ],
  fourth: [
    pendingBlockBaseClass,
    {
      "@layer": {
        [designSystemLayer]: {
          vars: {
            "--pending-block-color": "oklch(90.93% 0.045 288.25)",
          },
          animationDelay: "0.7995s",
        },
      },
    },
  ],
  fifth: [
    pendingBlockBaseClass,
    {
      "@layer": {
        [designSystemLayer]: {
          vars: {
            "--pending-block-color": "oklch(87.45% 0.064 286.931)",
          },
          animationDelay: "0.9945s",
        },
      },
    },
  ],
});

export const buttonRecipe = recipe({
  base: {
    "@layer": {
      [designSystemLayer]: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fallbackVar(buttonFontSizeVar, vars.buttonPrimitive.fontSize.sm),
        lineHeight: fallbackVar(lineHeightVar, vars.buttonPrimitive.lineHeight.sm),
        cursor: fallbackVar(buttonCursorVar, "pointer"),
        borderRadius: vars.buttonPrimitive.radius.md,
        fontWeight: vars.fontWeight.semibold,
        transitionProperty:
          "background-color, box-shadow, border-color, color, transform, outline",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
        willChange: "transform, box-shadow, opacity",
        outline: "none",
        selectors: {
          "&:focus-visible": {
            outline: `${vars.buttonPrimitive.focusRing.width} solid ${vars.buttonPrimitive.focusRing.color}`,
          },
          "&:focus-within": {
            boxShadow: `0 0 0 ${vars.buttonPrimitive.focusRing.offsetInner} ${vars.color.background}, 0 0 0 ${vars.buttonPrimitive.focusRing.offsetOuter} ${vars.color.ring}`,
          },
          "&:disabled": {
            pointerEvents: "none",
            opacity: vars.buttonPrimitive.state.disabledOpacity,
          },
          "&:active": {
            outline: `${vars.buttonPrimitive.focusRing.width} solid ${vars.buttonPrimitive.focusRing.color}`,
            transform: `scale(${vars.buttonPrimitive.state.activeScale})`,
          },
        },
      },
    },
  },
  variants: {
    variant: {
      default: {
        "@layer": {
          [designSystemLayer]: {
            backgroundColor: vars.button.primary.background,
            color: vars.button.secondary.background,
            selectors: {
              "&:hover": {
                color: vars.button.primary.hoverForeground,
                backgroundColor: vars.button.primary.hoverBackground,
              },
            },
          },
        },
      },
      primary: {
        "@layer": {
          [designSystemLayer]: {
            backgroundColor: vars.button.secondary.background,
            color: vars.button.secondary.foreground,
            fontSize: vars.buttonPrimitive.fontSize.lg,
            lineHeight: vars.buttonPrimitive.lineHeight.lg,
            selectors: {
              "&:hover": {
                color: vars.button.secondary.hoverForeground,
                backgroundColor: vars.button.secondary.hoverBackground,
                boxShadow: vars.buttonPrimitive.shadow.hover,
              },
            },
          },
        },
      },
      transparent: {
        "@layer": {
          [designSystemLayer]: {
            boxShadow: "none",
            backgroundColor: vars.button.ghost.background,
            color: vars.button.ghost.foreground,
          },
        },
      },
      destructive: {
        "@layer": {
          [designSystemLayer]: {
            backgroundColor: vars.button.danger.background,
            color: vars.button.danger.foreground,
            selectors: {
              "&:hover": {
                boxShadow: vars.buttonPrimitive.shadow.hover,
                backgroundColor: vars.button.danger.hoverBackground,
                color: vars.button.danger.hoverForeground,
              },
            },
          },
        },
      },
    },
    size: {
      default: {
        "@layer": {
          [designSystemLayer]: {
            width: "fit-content",
            height: "fit-content",
            padding: fallbackVar(
              buttonPaddingVar,
              `${vars.buttonPrimitive.padding.y.md} ${vars.buttonPrimitive.padding.x.md}`,
            ),
          },
        },
      },
      wide: {
        "@layer": {
          [designSystemLayer]: {
            width: "100%",
            padding: fallbackVar(
              buttonPaddingVar,
              `${vars.space[1]} ${vars.space[2]}`,
            ),
          },
        },
      },
      sm: {
        "@layer": {
          [designSystemLayer]: {
            height: vars.buttonPrimitive.height.sm,
            borderRadius: vars.buttonPrimitive.radius.sm,
            padding: fallbackVar(
              buttonPaddingVar,
              `0 ${vars.buttonPrimitive.padding.x.sm}`,
            ),
          },
        },
      },
      lg: {
        "@layer": {
          [designSystemLayer]: {
            height: vars.buttonPrimitive.height.md,
            borderRadius: vars.buttonPrimitive.radius.sm,
            padding: fallbackVar(
              buttonPaddingVar,
              `0 ${vars.buttonPrimitive.padding.x.lg}`,
            ),
          },
        },
      },
      pill: {
        "@layer": {
          [designSystemLayer]: {
            borderRadius: vars.buttonPrimitive.radius.pill,
            padding: fallbackVar(
              buttonPaddingVar,
              `${vars.buttonPrimitive.padding.y.pill} ${vars.buttonPrimitive.padding.x.pill}`,
            ),
            lineHeight: vars.fontSize["0.75rem"],
          },
        },
      },
      icon: {
        "@layer": {
          [designSystemLayer]: {
            height: vars.buttonPrimitive.height.icon,
            width: vars.buttonPrimitive.height.icon,
          },
        },
      },
    },
    font: {
      default: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.buttonPrimitive.fontSize.md },
        },
      },
      xs: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.fontSize["0.75rem"] },
        },
      },
      sm: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.buttonPrimitive.fontSize.sm },
        },
      },
      lg: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.buttonPrimitive.fontSize.lg },
        },
      },
      xl: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.buttonPrimitive.fontSize.xl },
        },
      },
      xxl: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.fontSize["1.5rem"] },
        },
      },
      xxxl: {
        "@layer": {
          [designSystemLayer]: { fontSize: vars.fontSize["1.875rem"] },
        },
      },
    },
    status: {
      idle: {},
      pending: {
        "@layer": {
          [designSystemLayer]: {
            cursor: "progress",
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
            selectors: {
              "&:disabled": {
                opacity: 1,
              },
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    status: "idle",
  },
});
