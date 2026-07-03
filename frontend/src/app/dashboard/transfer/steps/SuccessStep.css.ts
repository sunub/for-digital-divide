import { vars } from "@internal/design-system/style";
import { appStyle } from "@/style/utils";

export const successContent = appStyle({
  flex: 1,
});

export const successIconContainer = appStyle({
  width: vars.space[18],
  height: vars.space[18],
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: vars.space[6],
  borderRadius: vars.borderRadius.full,
  background:
    "color-mix(in oklch, var(--color-confirm) 18%, var(--color-card))",
  color: vars.color.income,
});

export const successIcon = appStyle({
  width: vars.space[16],
  height: vars.space[16],
});

export const title = appStyle({
  margin: vars.space[0],
  marginBottom: vars.space[2],
  wordBreak: "keep-all",
});

export const summaryText = appStyle({
  margin: vars.space[0],
  textAlign: "center",
  wordBreak: "keep-all",
});

export const amount = appStyle({
  margin: vars.space[0],
  color: vars.color.button,
});

export const detailCard = appStyle({
  width: vars.layout.full,
  display: "flex",
  flexDirection: "column",
  gap: vars.space[4],
  border: `1px solid color-mix(in oklch, ${vars.color.border} 40%, transparent)`,
  textAlign: "center",
});

export const description = appStyle({
  margin: vars.space[0],
  paddingTop: vars.space[4],
  borderTop: `1px solid color-mix(in oklch, ${vars.color.border} 30%, transparent)`,
  textAlign: "center",
  wordBreak: "keep-all",
});

export const actionFooter = appStyle({
  width: vars.layout.full,
});
