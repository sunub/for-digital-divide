import { vars } from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";

export const title = style({
  fontFamily: "var(--gugi-font-family)",
  willChange: "transform",
});

export const gridStyle = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
  gridTemplateColumns: "1fr .65fr",
  gridTemplateRows: "1fr",
});

export const phoneContentLayout = style({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  paddingTop: "48px",
  height: "100%",
  boxSizing: "border-box",
  justifyContent: "space-between",
  gap: "24px",
});

export const phoneTitle = style({
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.25",
  color: vars.color.button,
  letterSpacing: "-0.01em",
  textAlign: "left",
});

export const phoneSubtitle = style({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.5",
  color: vars.color.descriptionText,
  textAlign: "left",
  marginTop: "8px",
});

export const primaryButton = style({
  width: "100%",
  backgroundColor: vars.color.button,
  color: vars.color.white,
  fontWeight: "600",
  fontSize: "15px",
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: "0 10px 20px rgba(108, 62, 198, 0.15)",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: "oklch(52.06% 0.041 294.47)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
});

export const secondaryButton = style({
  width: "100%",
  backgroundColor: "transparent",
  color: vars.color.descriptionText,
  fontWeight: "500",
  fontSize: "13px",
  textAlign: "center",
  border: "none",
  cursor: "pointer",
  padding: "12px 0",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover": {
      color: vars.color.button,
    },
  },
});

export const actionArea = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
});
