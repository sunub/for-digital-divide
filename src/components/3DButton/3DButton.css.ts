import { createVar, style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";

const vars = {
  shadowGradient: createVar(),
  inputBg: createVar(),
  borderColor: createVar(),
};

export const rootClass = style({
  cursor: "pointer",
  backgroundColor: "transparent",
  borderRadius: "0.75rem",
  border: "none",
  position: "relative",
  WebkitTapHighlightColor: "transparent",
  outlineOffset: "4px",
  height: "fit-content",
  fontSize: "1.5rem",
  transition: "width 100ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  selectors: {
    "&:focus:not(:focus-visible)": {
      outline: "none",
    },
  },
});

export const frontClass = style({
  position: "relative",
  display: "inline-flex",
  padding: "0 1rem",
  height: "3rem",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontWeight: 700,
  borderRadius: "1rem",
  backgroundColor: vars.inputBg,
  border: `5px solid ${vars.borderColor}`,
  userSelect: "none",
  willChange: "transform",
  transform: "translateY(-6px)",
  transition: "all 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
  lineHeight: "calc(16px + 24px)",
  textDecoration: "none",

  selectors: {
    [`${rootClass}:hover &`]: {
      transform: "translateY(-12px)",
    },
    [`${rootClass}:active &`]: {
      transform: "translateY(-2px)",
    },
    [`${rootClass}[aria-pressed='true'] &`]: {
      transform: "translateY(-2px)",
    },
  },
});

export const shadowClass = style({
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
    [`${rootClass}:hover:not(:focus) &`]: {
      transform: "translateY(6px)",
      transition: "transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1)",
    },

    [`${rootClass}[aria-pressed='true'] &`]: {
      transform: "translateY(2px)",
      transition: "transform 340ms",
    },
  },
});

export const edgeClass = style({
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
  borderBottomRightRadius: "16px",
  borderBottomLeftRadius: "16px",
  backgroundImage: vars.shadowGradient,
});

export const dotClass = recipe({
  base: {
    width: "0.25rem",
    height: "0.25rem",
    display: "block",
    borderRadius: "50%",
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
      upper: { backgroundColor: "currentColor" },
      lower: {
        backgroundColor: "#334155",
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
          [vars.borderColor]: "oklch(65.57% 0.19 288.17)",
          [vars.inputBg]: "oklch(99.71% 0 66)",
          [vars.shadowGradient]: `linear-gradient(to left, oklch(65.57% 0.19 288.17) 0%, oklch(75.57% 0.19 288.17) 9%, oklch(75.57% 0.19 288.17) 91%, oklch(35.57% 0.19 288.17) 100%)`,
        },
      },
      confirm: {
        vars: {
          [vars.borderColor]: "oklch(60.96% 0.114 146.9)",
          [vars.inputBg]: "oklch(84.51% 0.162 147.29)",
          [vars.shadowGradient]: `linear-gradient(to left, oklch(60.96% 0.114 146.9) 0%, oklch(73.59% 0.114 146.9) 9%, oklch(73.59% 0.114 146.9) 91%, oklch(60.96% 0.114 146.9) 100%)`,
        },
      },
      destructive: {
        vars: {
          [vars.borderColor]: "oklch(68.88% 0.231 26.47)",
          [vars.inputBg]: "oklch(68.88% 0.231 26.47)",
          [vars.shadowGradient]: `linear-gradient(to left, oklch(68.88% 0.231 26.47) 0%, oklch(65.88% 0.231 26.47) 9%, oklch(65.88% 0.231 26.47) 91%, oklch(68.88% 0.231 26.47) 0%)`,
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

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
