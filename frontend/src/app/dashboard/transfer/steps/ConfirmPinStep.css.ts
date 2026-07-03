import { vars } from "@internal/design-system/style";
import { appStyle } from "@/style/utils";

export const transferErrorText = appStyle({
  color: vars.color.destructive,
  fontWeight: vars.fontWeight.semibold,
  textAlign: "center",
});

export const pinForm = appStyle({
  height: "100%",
});

export const transferActionFooter = appStyle({
  position: "absolute",
  right: vars.space[4],
  bottom: vars.space[4],
  left: vars.space[4],
});
