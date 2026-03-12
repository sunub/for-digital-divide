import { globalStyle, style } from "@vanilla-extract/css";

export const title = style({
  fontFamily: "var(--gugi-font-family)",
  willChange: "transform",
});

globalStyle(`${title} > svg`, {
  transform: "scale(1.25) rotate(-90deg)",
});
