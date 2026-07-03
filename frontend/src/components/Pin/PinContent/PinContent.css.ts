import { vars } from "@internal/design-system/style";
import {
  createVar,
  fallbackVar,
  globalStyle,
  style,
} from "@vanilla-extract/css";

const pointerWidthVar = createVar();
const pointerCursorVar = createVar();
const pointerPlaceholderVar = createVar();

export const rootContainer = style({
  gridArea: "content-device / 1",
  paddingTop: vars.space["8"],
});

export const headerContainer = style({
  maxWidth: "17rem",
});

export const title = style({
  wordWrap: "break-word",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 0%)",
});

export const description = style({
  wordWrap: "break-word",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34) 50%, var(--color-primary) 0%)",
});

export const pointer = style({
  position: "relative",
  display: "inline-block",
  width: fallbackVar(pointerWidthVar, "10cqw"),
  height: "8cqh",
  borderRadius: "8px",
  background: "oklch(75.35% 0.162 289.07 / 60%)",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.06)",

  selectors: {
    "&::before": {
      content: "''",
      width: "30px",
      height: "3px",
      borderRadius: "5px",
      background: "oklch(99.88% 0.015 294.47)",
      visibility: fallbackVar(pointerCursorVar, "hidden"),
      position: "absolute",
      bottom: "10%",
      left: "calc(50% - 15px)",
      animation: "blink 1.25s infinite",
    },
    "&::after": {
      content: "''",
      width: "15px",
      height: "15px",
      position: "absolute",
      top: "calc(50% - 7.5px)",
      left: "calc(50% - 7.5px)",
      background: "oklch(99.88% 0.015 294.47)",
      borderRadius: "50%",
      aspectRatio: "1 / 1",
      transform: `scale(${fallbackVar(pointerPlaceholderVar, "0")})`,
      transition: "transform 250ms ease",
    },
  },
});

globalStyle(`${pointer} > input`, {
  width: "1px",
  height: "1px",
  opacity: 0,
  userSelect: "none",
  visibility: "hidden",
});

globalStyle(`${pointer}:has(input.pinnumber-display:checked)`, {
  vars: {
    [pointerPlaceholderVar]: "1",
  },
});

globalStyle(`${pointer}:has(input.pin-pointer-input:checked)`, {
  vars: {
    [pointerCursorVar]: "visible",
  },
});
