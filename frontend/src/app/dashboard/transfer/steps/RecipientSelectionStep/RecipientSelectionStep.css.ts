import { vars } from "@internal/design-system/style";
import { appLayer } from "@internal/design-system/style/layers.css";
import { globalStyle, styleVariants } from "@vanilla-extract/css";
import { appStyle } from "@/style/utils";

export const backwardButton = appStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 200ms ease-in",
  ":hover": {
    transform: "translateX(-5%)",
    opacity: 0.75,
  },
});

export const directInputButton = appStyle({
  padding: vars.space[3],
  backgroundColor: vars.color.card,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.borderRadius.md,
  width: "100%",
  marginTop: vars.space[2],
  color: vars.color.primary,
  transition: "border-color 0.2s, background-color 0.2s",
  ":hover": {
    borderColor: vars.color.primary,
  },
});

globalStyle(`${directInputButton} > span`, {
  "@layer": {
    [appLayer]: {
      justifyContent: "space-between",
    },
  },
});

export const chevronIcon = appStyle({
  color: vars.color.border,
  fontSize: vars.space[6],
});

export const mockAccountList = appStyle({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space[1],
});

export const mockAccountItem = appStyle({
  gap: vars.space[4],
  padding: vars.space[4],
  borderRadius: vars.borderRadius.md,
  width: "100%",
  textAlign: "left",
  transition: "background-color 0.2s, transform 0.2s",
  ":hover": {
    backgroundColor: `color-mix(in oklch, ${vars.color.foreground} 5%, transparent)`,
  },
});

globalStyle(`${mockAccountItem} > span`, {
  "@layer": {
    [appLayer]: {
      justifyContent: "flex-start",
      gap: vars.space[4],
    },
  },
});

export const avatarContainer = appStyle({
  flexShrink: 0,
  transition: "transform 0.2s",
  selectors: {
    [`${mockAccountItem}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const avatarVariants = styleVariants({
  hana: {
    "@layer": {
      [appLayer]: {
        backgroundColor: `color-mix(in oklch, ${vars.color.confirm} 16%, transparent)`,
        color: vars.color.confirm,
      },
    },
  },
  kb: {
    "@layer": {
      [appLayer]: {
        backgroundColor: `color-mix(in oklch, ${vars.color.buttonConfirm} 24%, transparent)`,
        color: vars.color.buttonConfirmForeground,
      },
    },
  },
  ibk: {
    "@layer": {
      [appLayer]: {
        backgroundColor: `color-mix(in oklch, ${vars.color.balance} 14%, transparent)`,
        color: vars.color.balance,
      },
    },
  },
  default: {
    "@layer": {
      [appLayer]: {
        backgroundColor: `color-mix(in oklch, ${vars.color.primary} 10%, transparent)`,
        color: vars.color.primary,
      },
    },
  },
});

export const textLabelContainer = appStyle({
  flex: 1,
  textAlign: "left",
});
