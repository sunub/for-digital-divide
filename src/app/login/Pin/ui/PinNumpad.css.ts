// src/components/PinNumpad/numpad.css.ts
import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@for-digital-divide/design-system/styles";

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
  justifyContent: "center",
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

// --- Pad (Icon) Styles ---
export const padIcon = style({
  display: "block",
  position: "relative",
  cursor: "pointer",

  // Tailwind config에서 가져온 값들
  width: "40px", // vars.size.numpad 등이 있다면 교체
  height: "50px", // vars.size.numpad 등에 맞춰 수정
  backgroundImage: "url('/images/numpad.png')",
  backgroundRepeat: "no-repeat",
  // backgroundSize: "cover", // 필요하다면 추가

  transform: "scale(var(--pad-button-scale))",

  // 동적 위치 할당
  backgroundPosition: `${bgPosX} ${bgPosY}`,
});

// --- Action Buttons Wrapper ---
export const actionButtons = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  gap: "1rem",
});
