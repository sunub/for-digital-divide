import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[6],
});

export const iconContainer = style({
  width: "64px",
  height: "64px",
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.color.confirm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 4px 12px color-mix(in oklch, ${vars.color.confirm} 60%, transparent)`,
});

export const icon = style({
  fontSize: vars.fontSize["2rem"],
  color: vars.color.white,
  fontWeight: vars.fontWeight.bold,
});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space[2],
});

export const titleText = style({
  fontSize: vars.fontSize["1.5rem"],
  fontWeight: vars.fontWeight.bold,
  textAlign: "center",
});

export const descriptionText = style({
  color: vars.color.descriptionText,
  textAlign: "center",
  lineHeight: "1.4",
});

export const button = style({
  width: "100%",
  marginTop: vars.space[4],
});
