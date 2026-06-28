import { style, styleVariants } from "@vanilla-extract/css";
import { designSystemLayer } from "../styles/layers.css";
import { vars } from "../tokens/theme.css";

export const surfaceBase = style({
  "@layer": {
    [designSystemLayer]: {
      boxSizing: "border-box",
      width: "100%",
    },
  },
});

export const surfaceTone = styleVariants({
  canvas: {
    "@layer": {
      [designSystemLayer]: {
        backgroundColor: vars.color.background,
        color: vars.color.foreground,
      },
    },
  },
  subtle: {
    "@layer": {
      [designSystemLayer]: {
        backgroundColor: vars.color.device,
        color: vars.color.text,
      },
    },
  },
  emphasis: {
    "@layer": {
      [designSystemLayer]: {
        backgroundColor: vars.color.emphasis,
        color: vars.color.text,
      },
    },
  },
  destructive: {
    "@layer": {
      [designSystemLayer]: {
        backgroundColor: vars.color.destructive,
        color: vars.color.text,
      },
    },
  },
});

export const surfaceElevation = styleVariants({
  none: {},
  raised: {
    "@layer": {
      [designSystemLayer]: {
        boxShadow: `0 18px 48px -24px ${vars.color.shadowOutline}`,
      },
    },
  },
});
