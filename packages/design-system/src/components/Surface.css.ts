import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";

export const surfaceBase = style({
  boxSizing: "border-box",
  width: "100%",
});

export const surfaceTone = styleVariants({
  canvas: {
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
  },
  subtle: {
    backgroundColor: vars.color.device,
    color: vars.color.text,
  },
  emphasis: {
    backgroundColor: vars.color.emphasis,
    color: vars.color.text,
  },
});

export const surfaceElevation = styleVariants({
  none: {},
  raised: {
    boxShadow: `0 18px 48px -24px ${vars.color.shadowOutline}`,
  },
});
