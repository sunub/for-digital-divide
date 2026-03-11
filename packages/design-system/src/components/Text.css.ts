import { styleVariants } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";

export const textVariant = styleVariants({
  default: {
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    color: "inherit",
  },
  hero: {
    fontSize: vars.fontSize["2rem"],
    fontWeight: vars.fontWeight.black,
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
  },
  title: {
    fontSize: vars.fontSize["1.25rem"],
    fontWeight: vars.fontWeight.black,
  },
  body: {
    fontSize: vars.fontSize["1rem"],
    fontWeight: vars.fontWeight.normal,
    lineHeight: 1.6,
  },
  bodyStrong: {
    fontSize: vars.fontSize["1rem"],
    fontWeight: vars.fontWeight.semibold,
    lineHeight: 1.6,
  },
  description: {
    fontSize: vars.fontSize["0.75rem"],
    fontWeight: vars.fontWeight.normal,
    lineHeight: 1.4,
  },
});
