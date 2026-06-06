import { vars } from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";

export const instructionBox = style({
  backdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
  WebkitBackdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
  boxShadow: vars.surface.interactiveCard.shadow,
  borderRadius: vars.surface.interactiveCard.radius,
  backgroundColor: vars.surface.interactiveCard.background,
  padding: vars.space["8"],
  display: "flex",
  flexDirection: "column",
  gap: "4cqw",
  width: "100%",
});
