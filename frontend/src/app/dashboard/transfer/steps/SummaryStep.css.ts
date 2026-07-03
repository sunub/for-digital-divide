import { vars } from "@internal/design-system/style";
import { appStyle } from "@/style/utils";

export const summaryCard = appStyle({
  border: `1px solid ${vars.color.border}`,
  textAlign: "center",
});

export const accountText = appStyle({
  wordBreak: "keep-all",
});

export const balanceText = appStyle({
  paddingTop: vars.space[4],
  marginTop: vars.space[4],
  borderTop: `1px solid color-mix(in oklch, ${vars.color.border} 40%, transparent)`,
});

export const memoFields = appStyle({
  flex: 1,
});
