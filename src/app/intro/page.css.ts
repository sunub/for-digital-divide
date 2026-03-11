import { globalStyle, style } from "@vanilla-extract/css";

export const title = style({
  fontFamily: "'Gugi', sans-serif",
  willChange: "transform",
});

globalStyle(`${title} > svg`, {
  transform: "scale(1.25) rotate(-90deg)",
});
