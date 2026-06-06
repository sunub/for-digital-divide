import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const confrimColorVar = createVar();

export const container = style({
  position: "fixed",
  top: "50%",
  left: "1rem",
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "20cqw",
  padding: "16px",
  backgroundColor: "var(--color-background)",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  fontSize: "0.75rem",
  userSelect: "none",
  transform: "translateY(-50%)",
});

export const stepListItem = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "color-mix(in oklch, var(--color-button) 30%, transparent )",
    transition: "color 0.3s",
  },
  variants: {
    done: {
      true: { color: confrimColorVar },
      false: {},
    },
    isProgress: {
      true: { color: "var(--color-button)" },
      false: {},
    },
    isChild: {
      true: { transform: "translateX(1rem)" },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { done: true },
      style: { color: confrimColorVar },
    },
    {
      variants: { done: false, isProgress: true },
      style: { color: "var(--color-button)" },
    },
    {
      variants: { done: false, isProgress: false },
      style: {
        color: "color-mix(in oklch, var(--color-button) 30%, transparent )",
      },
    },
  ],
});

export const circle = recipe({
  base: {
    borderRadius: "50%",
    flexShrink: 0,
    transition: "background-color 0.3s ease-in-out",
  },
  variants: {
    done: {
      true: {
        width: "0.75rem",
        height: "0.75rem",
        backgroundColor: confrimColorVar,
      },
      false: {
        width: "0.5rem",
        height: "0.5rem",
        backgroundColor:
          "color-mix(in oklch, var(--color-button) 30%, transparent )",
      },
    },
  },
});

export const checkIconContainer = style({
  position: "absolute",
  top: "-4px",
  left: "-2px",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: "-1px",
      left: "8px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      aspectRatio: "1",
      backgroundColor: "var(--color-background)",
      zIndex: 1,
    },
  },
});

globalStyle(`${checkIconContainer} > svg`, {
  position: "absolute",
  top: "1px",
  left: "10px",
  zIndex: 2,
});

export const iconContainer = style({
  position: "relative",
});

export const loadingContainer = style({
  position: "relative",
  top: "-2px",
  maxWidth: "50px",
  marginLeft: "-4px",
});
