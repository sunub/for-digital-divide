import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@for-digital-divide/design-system/styles";

export const headerContainer = style({
  gridArea: "dashboard-header / 1",

  zIndex: vars.zIndex.drawer,
  color: vars.surface.header.foreground,
  backgroundColor: vars.surface.header.background,
  backdropFilter: `blur(${vars.surface.header.backdropBlur})`,
  borderTopLeftRadius: vars.surface.header.radius,
  borderTopRightRadius: vars.surface.header.radius,

  padding: `0 ${vars.space[6]}`,
});

export const handIconContainer = style({
  position: "absolute",
  top: -8,
  left: 12,
});

export const logOutButton = style({
  selectors: {
    "&:hover": {
      backgroundColor: vars.button.primary.hoverBackground,
      boxShadow: vars.buttonPrimitive.shadow.hover,
    },
  },
});

globalStyle(`${logOutButton} > svg`, {
  color: vars.color.text,
  transition: "color 200ms ease-in-out",
});

export const logOutButtonSvg = style({
  color: vars.color.text,
  transition: "color 200ms ease-in-out",
});
