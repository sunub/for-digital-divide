import { style } from "@vanilla-extract/css";
import { vars } from "@internal/design-system/style";

export const phoneContentLayout = style({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  paddingTop: "48px",
  height: "100%",
  boxSizing: "border-box",
  justifyContent: "space-between",
  gap: "24px",
  width: "100%",
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
  marginBottom: "32px",
});

export const methodButtons = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const kbButton = style({
  width: "100%",
  height: "4.5rem",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "16px 24px",
  border: `1px solid ${vars.color.border || "rgba(0, 0, 0, 0.08)"}`,
  background: vars.color.white,
  cursor: "pointer",
  textAlign: "left",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.button,
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
});

export const kbBadge = style({
  fontSize: "12px",
  background: "rgba(108, 62, 198, 0.08)",
  color: vars.color.button,
  padding: "3px 8px",
  borderRadius: "6px",
  fontWeight: "700",
});

export const methodDesc = style({
  fontSize: "13px",
  color: vars.color.descriptionText,
  fontWeight: "400",
  marginTop: "4px",
});

export const infoText = style({
  fontSize: "12px",
  color: vars.color.descriptionText,
  textAlign: "center",
  width: "100%",
  marginTop: "auto",
  marginBottom: "16px",
});
