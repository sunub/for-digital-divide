import { vars } from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";

export const instructionTitle = style({
  fontFamily: "Manrope, sans-serif",
  fontSize: "clamp(16px, 4.5cqw, 20px)",
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
  margin: 0,
  width: "100%",
});
