import { vars } from "@internal/design-system/tokens";
import { appStyle } from "@/style/utils";

export const iconContainer = appStyle({
  width: "64px",
  height: "64px",
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.color.confirm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 4px 12px color-mix(in oklch, ${vars.color.confirm} 60%, transparent)`,
});

export const icon = appStyle({
  fontSize: vars.fontSize["2rem"],
  color: vars.color.white,
  fontWeight: vars.fontWeight.bold,
});
