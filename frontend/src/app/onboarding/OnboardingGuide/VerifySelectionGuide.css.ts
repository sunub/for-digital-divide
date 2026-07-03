import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

export const panelContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  maxWidth: "520px",
  width: "100%",
  justifySelf: "flex-end",
  boxSizing: "border-box",
  textAlign: "left",
  maxHeight: "100vh",
  overflowY: "auto",
});

export const headerBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "8px",
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: vars.color.button,
  padding: "8px 16px",
  borderRadius: "9999px",
  width: "fit-content",
  fontWeight: vars.fontWeight.semibold,
  fontSize: "14px",
  lineHeight: "20px",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
});

export const badgeIcon = style({
  fontSize: "18px",
});

export const title = style({
  fontSize: "48px",
  lineHeight: "56px",
  fontWeight: vars.fontWeight.bold,
  color: vars.color.button,
  letterSpacing: "-0.02em",
  margin: 0,
  "@media": {
    "screen and (max-width: 768px)": {
      fontSize: "32px",
      lineHeight: "40px",
    },
  },
});

export const description = style({
  fontSize: "18px",
  lineHeight: "28px",
  fontWeight: vars.fontWeight.normal,
  color: vars.color.text,
  opacity: 0.8,
  maxWidth: "480px",
  marginTop: "16px",
});

export const cardContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const glassCard = style({
  background: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow: "0 8px 32px 0 rgba(108, 62, 198, 0.1)",
  borderRadius: "24px", // 3xl
  padding: "20px",
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
  boxSizing: "border-box",
  transition: "all 0.3s ease",
  selectors: {
    "&:hover": {
      background: "rgba(255, 255, 255, 0.5)",
      boxShadow: "0 12px 40px 0 rgba(108, 62, 198, 0.15)",
    },
  },
});

export const iconBox = style({
  width: "48px",
  height: "48px",
  borderRadius: "12px", // xl
  backgroundColor: vars.color.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
});

export const icon = style({
  color: vars.color.button,
  fontSize: "28px",
});

export const cardTitle = style({
  fontSize: "16px",
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
  margin: 0,
});

export const cardDescription = style({
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: vars.fontWeight.normal,
  color: vars.color.text,
  opacity: 0.7,
  marginTop: "4px",
  marginBottom: 0,
});

export const actionButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "fit-content",
  backgroundColor: vars.color.button,
  color: vars.color.white,
  padding: "16px 32px",
  borderRadius: "24px", // 3xl
  fontWeight: vars.fontWeight.semibold,
  fontSize: "14px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(108, 62, 198, 0.15)",
  transition: "all 0.3s ease",
  marginTop: "8px",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 12px 24px rgba(108, 62, 198, 0.25)",
      opacity: 0.95,
    },
    "&:active": {
      transform: "translateY(1px)",
    },
  },
});
