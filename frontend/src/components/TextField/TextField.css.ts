import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const borderTopVar = createVar();
export const borderRightVar = createVar();
export const borderBottomVar = createVar();
export const borderLeftVar = createVar();
export const borderColorVar = createVar();

export const borderRadiusVar = createVar();

export const iconWrapper = recipe({
  base: {
    position: "absolute",
    left: "1rem",
    transition: "opacity 300ms ease-in-out",
  },
  variants: {
    isTyping: {
      true: { opacity: 1 },
      false: { opacity: 0.5 },
    },
  },
  defaultVariants: {
    isTyping: false,
  },
});

export const suffixIconWrapper = recipe({
  base: {
    position: "absolute",
    right: "1rem",
    transition: "opacity 300ms ease-in-out",
  },
  variants: {
    isTyping: {
      true: { opacity: 1 },
      false: { opacity: 0.5 },
    },
  },
  defaultVariants: {
    isTyping: false,
  },
});

export const inputWrapper = recipe({
  base: {
    position: "relative",
    display: "grid",
    gridTemplate: "[username-input] 1fr / [username-input] 1fr",
    alignItems: "center",
    justifyItems: "center",
    opacity: 0.4,
    borderRadius: fallbackVar(borderRadiusVar, "12px"),
    borderRight: fallbackVar(borderRightVar, `2px solid ${borderColorVar}`),
    borderTop: fallbackVar(borderTopVar, `2px solid ${borderColorVar}`),
    borderBottom: fallbackVar(borderBottomVar, `2px solid ${borderColorVar}`),
    borderLeft: fallbackVar(borderLeftVar, `2px solid ${borderColorVar}`),
    padding: "2px 4px",
    gap: "4px",
    transition: "opacity 300ms ease-in-out",
    willChange: "opacity",
    selectors: {
      "&:hover": { opacity: 1 },
      "&:focus-within": { opacity: 1 },
    },
    color: "var(--color-text)",
  },
  variants: {
    isError: {
      true: {
        vars: {
          [borderColorVar]: "var(--color-button)",
        },
        color: "var(--color-text)",
      },
      false: {
        vars: {
          [borderColorVar]: "var(--color-invalid)",
        },
        color: "var(--color-invalid)",
      },
    },
  },
  defaultVariants: {
    isError: false,
  },
});

export const input = style({
  gridArea: "username-input",
  border: "none",
  fontWeight: 700,
  background: "none",
  fontSize: "var(--text-size)",
  textAlign: "center",
  padding: "16px 50px",
  WebkitAppearance: "none",
  appearance: "none",
  fontFamily: "Segoe UI, Apple SD Gothic Neo, sans-serif",
  color: "inherit",
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});

export const placeholder = recipe({
  base: {
    gridArea: "username-input",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    pointerEvents: "none",
    userSelect: "none",
    willChange: "transform, background, color",
    background: "transparent",
    transform: "none",
    transition:
      "transform 200ms ease-in-out, background 200ms ease-in-out, color 200ms ease-in-out",
  },
  variants: {
    isFocused: {
      true: {
        background: "oklch(96.33% 0.017 294.49)",
        transform: "translateY(-80%) translateX(2%) scale(0.8)",
      },
      false: {
        background: "transparent",
        transform: "none",
      },
    },
  },
  defaultVariants: {
    isFocused: false,
  },
});

export const inputContainer = style({
  marginLeft: "auto",
  marginRight: "auto",
});

export const inputRootContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});
