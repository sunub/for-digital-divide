import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/style/theme.css";

export const bgPosX = createVar();
export const bgPosY = createVar();

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "2rem",
});

export const numpadWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const numpadRow = style({
  display: "flex",
  flexDirection: "row",
  width: "273px",
  gap: "2px",
  color: vars.color.deviceText,
});

export const innerButton = style({
  width: "100%",
  height: "100%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

export const padButtonItem = recipe({
  base: {
    backgroundColor: vars.color.device,
    fontSize: "var(--pad-button-text-size)",
    width: "var(--pad-button-width)",
    height: "var(--pad-button-height)",
    display: "grid",
    placeContent: "center",
    textAlign: "center",
    transitionProperty: "transform, border-color, box-shadow, background-color",
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.17, 1.48, 0.24, 1)",
    border: "1px solid transparent",

    backfaceVisibility: "hidden",
    transform: "translateZ(0)",
    willChange: "transform",

    selectors: {
      "&:hover": {
        transform: "scale(1.05)",
        borderColor: vars.color.buttonDefault,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
    },
  },
  variants: {
    shape: {
      tl: { borderTopLeftRadius: "var(--pad-button-radius)" },
      tr: { borderTopRightRadius: "var(--pad-button-radius)" },
      bl: { borderBottomLeftRadius: "var(--pad-button-radius)" },
      br: { borderBottomRightRadius: "var(--pad-button-radius)" },
      none: {},
    },
  },
  defaultVariants: {
    shape: "none",
  },
});

export const padIcon = style({
  display: "block",
  position: "relative",
  cursor: "pointer",

  width: "40px",
  height: "50px",
  backgroundImage: "url('/images/numpad.png')",
  backgroundRepeat: "no-repeat",

  transform: "scale(var(--pad-button-scale))",
  backgroundPosition: `${bgPosX} ${bgPosY}`,
});

export const actionButtons = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: "1rem",
});
