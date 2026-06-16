import { vars } from "@internal/design-system/style";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const stepBgVar = createVar();
export const stepColorVar = createVar();
export const stepTextColorVar = createVar();

export const instructionItem = style({
  gap: "3cqw",
});

export const stepIndicator = style({
  width: "clamp(20px, 6cqw, 24px)",
  height: "clamp(20px, 6cqw, 24px)",
  flexShrink: 0,
  borderRadius: "9999px",
  backgroundColor: fallbackVar(stepBgVar, vars.color.deviceOutline),
  color: fallbackVar(stepColorVar, vars.color.descriptionText),
  fontFamily: "Manrope, sans-serif",
  fontSize: "clamp(10px, 3cqw, 12px)",
  fontWeight: 500,
  transition: "background-color 0.2s, color 0.2s",
});

export const stepText = style({
  fontFamily: "Manrope, sans-serif",
  fontSize: "clamp(14px, 4cqw, 16px)",
  fontWeight: 400,
  color: fallbackVar(stepTextColorVar, vars.color.text),
  transition: "color 0.2s",
});
