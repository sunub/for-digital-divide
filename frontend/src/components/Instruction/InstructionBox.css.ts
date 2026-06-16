import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

export const instructionBox = style({
  backdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
  WebkitBackdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
  boxShadow: vars.surface.interactiveCard.shadow,
  borderRadius: vars.surface.interactiveCard.radius,
  backgroundColor: vars.surface.interactiveCard.background,
  gap: "4cqw",
});
