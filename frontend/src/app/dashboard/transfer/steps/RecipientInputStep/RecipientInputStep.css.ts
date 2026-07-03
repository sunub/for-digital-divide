import { vars } from "@internal/design-system/style";
import { appLayer } from "@internal/design-system/style/layers.css";
import { globalStyle } from "@vanilla-extract/css";
import {
  contentHeightVar,
  drawerContainer,
  drawerContainerSizeVar,
  drawerHeightVar,
} from "@/shared/layout/style/layout.css";
import { appStyle } from "@/style/utils";

export const accountNumber = appStyle({
  border: `1px solid ${vars.color.gray700}`,
  width: "100%",
});

export const recipientInputLayout = appStyle({
  display: "grid",
  width: "100cqw",
  height: "100cqh",
  transition: "grid 500ms cubic-bezier(0.17, 1.48, 0.24, 1)",
  gridTemplateRows: `[content-device] ${contentHeightVar} [drawer-device] ${drawerHeightVar}`,
});

export const recipientInputContent = appStyle({
  gridArea: "content-device / 1",
  minHeight: 0,
});

globalStyle(`${recipientInputLayout} > ${drawerContainer}`, {
  width: drawerContainerSizeVar,
});

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
  border: `1px solid ${vars.color.gray500}`,
  color: vars.color.black,
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

export const bankErrorText = appStyle({
  fontSize: "12px",
  color: vars.color.highlight,
  paddingLeft: "4px",
  marginTop: "2px",
});
