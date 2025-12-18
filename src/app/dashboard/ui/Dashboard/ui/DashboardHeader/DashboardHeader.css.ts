import { globalStyle, style } from "@vanilla-extract/css";

export const headerContainer = style({
  gridArea: "dashboard-header / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10,
  color: "color-mix(in oklch, var(--color-accent), oklch(0.4002 0.206 288.34))",
  backgroundColor: "color-mix(in oklch, var(--color-primary), transparent)",
  backdropFilter: "blur(5px)",
  borderTopLeftRadius: "2.5rem",
  borderTopRightRadius: "2.5rem",

  padding: "0 1.5rem",
});

export const headerSideContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
});

export const username = style({
  fontWeight: "bold",
  fontSize: "1.125rem",
  userSelect: "none",
});

export const headerIconContainer = style({
  position: "relative",
});

export const handIconContainer = style({
  position: "absolute",
  top: -8,
  left: 12,
});

export const emptyHeaderContainer = style({
  gridArea: "dashboard-header / 1",
  width: "100%",
  height: "100%",
});

export const logOutButton = style({
  selectors: {
    "&:hover": {
      backgroundColor: "var(--color-button-hover)",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
});

globalStyle(`${logOutButton} > svg`, {
  color: "var(--color-text)",
  transition: "color 200ms ease-in-out",
});

export const logOutButtonSvg = style({
  color: "var(--color-text)",
  transition: "color 200ms ease-in-out",
});
