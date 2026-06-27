import { styleVariants } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";
import { designSystemLayer } from "../styles/layers.css";

export const textVariant = styleVariants({
  default: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: "inherit",
        fontWeight: "inherit",
        lineHeight: "inherit",
        color: "inherit",
      },
    },
  },
  hero: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: vars.fontSize["2rem"],
        fontWeight: vars.fontWeight.black,
        lineHeight: 1.1,
        letterSpacing: "-0.04em",
      },
    },
  },
  title: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: vars.fontSize["1.25rem"],
        fontWeight: vars.fontWeight.black,
      },
    },
  },
  body: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: vars.fontSize["1rem"],
        fontWeight: vars.fontWeight.normal,
        lineHeight: 1.6,
      },
    },
  },
  bodyStrong: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: vars.fontSize["1rem"],
        fontWeight: vars.fontWeight.semibold,
        lineHeight: 1.6,
      },
    },
  },
  description: {
    "@layer": {
      [designSystemLayer]: {
        fontSize: vars.fontSize["0.75rem"],
        fontWeight: vars.fontWeight.normal,
        lineHeight: 1.4,
      },
    },
  },
});
