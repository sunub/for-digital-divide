import { style } from "@vanilla-extract/css";
import { vars } from "@for-digital-divide/design-system/styles";

export const cardLayoutRootContainer = style({
  position: "relative",
  width: "100%",
  userSelect: "none",
});

export const graph = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: vars.size.button,
});

export const chartTitle = style({
  textAlign: "center",
  color: vars.surface.interactiveCard.foreground,
});
