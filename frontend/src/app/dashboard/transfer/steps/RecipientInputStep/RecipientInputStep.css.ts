import { vars } from "@internal/design-system/style";
import { appLayer } from "@internal/design-system/style/layers.css";
import { globalStyle } from "@vanilla-extract/css";
import { appStyle } from "@/style/utils";

export const accountList = appStyle({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
});

export const accountButton = appStyle({
  width: "100%",
  padding: vars.space[4],
  backgroundColor: vars.color.card,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.borderRadius.md,
  textAlign: "left",
  transition: "border-color 0.2s, background-color 0.2s",
  ":hover": {
    borderColor: vars.color.primary,
    backgroundColor: `color-mix(in oklch, ${vars.color.foreground} 5%, ${vars.color.card})`,
  },
});

globalStyle(`${accountButton} > span`, {
  "@layer": {
    [appLayer]: {
      justifyContent: "flex-start",
    },
  },
});

export const bankSelectButton = appStyle({
  width: "100%",
  textAlign: "left",
});

globalStyle(`${bankSelectButton} > span`, {
  "@layer": {
    [appLayer]: {
      justifyContent: "flex-start",
    },
  },
});

export const drawerBankButton = appStyle({
  width: "100%",
  backgroundColor: vars.color.card,
});

export const fullWidthButton = appStyle({
  width: "100%",
});
