import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

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
