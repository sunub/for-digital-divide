import { style } from "@vanilla-extract/css";
import { vars } from "@for-digital-divide/design-system/styles";

export const chartGraphWrapper = style({
  flex: 1,
  maxWidth: "80cqw",
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: "326px",
  overflow: "hidden",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: vars.color.thumb,
});
