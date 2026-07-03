import { appStyle } from "@/style/utils";
import { vars } from "@internal/design-system/style";

export const numpad = appStyle({
  gap: "2px",
  background: vars.color.background,
  paddingTop: vars.space["4"],
  paddingBottom: vars.space["6"],
  borderRadius: vars.fontSize["0.75rem"],
});
