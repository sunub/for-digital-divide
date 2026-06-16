import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

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
  marginBottom: "24px",
});

export const methodForm = style({
  width: "100%",
});

export const methodFieldset = style({
  border: "none",
  margin: 0,
  padding: 0,
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
});

export const methodOptions = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const methodOptionInput = style({
  position: "absolute",
  opacity: 0,
  width: "1px",
  height: "1px",
  pointerEvents: "none",
});

export const methodOptionLabel = style({
  width: "100%",
  minHeight: "4.5rem",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  padding: "16px 24px",
  border: `1px solid ${vars.color.border}`,
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
    [`${methodOptionInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.color.button}`,
      outlineOffset: "2px",
    },
  },
});

export const methodOptionLabelSelected = style({
  borderColor: vars.color.button,
  backgroundColor: vars.color.emphasis,
});

export const methodOptionHeader = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
});

export const methodOptionTitle = style({
  fontWeight: 700,
  color: vars.color.text,
});

export const methodOptionDescription = style({
  fontSize: "13px",
  color: vars.color.descriptionText,
  fontWeight: "400",
});

export const methodBadge = style({
  fontSize: "12px",
  background: "rgba(108, 62, 198, 0.08)",
  color: vars.color.button,
  padding: "3px 8px",
  borderRadius: "6px",
  fontWeight: "700",
});

export const actionButtons = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "16px",
});

export const guideButton = style({
  width: "100%",
});

export const submitButton = style({
  width: "100%",
});

export const dialogContent = style({
  padding: "16px",
});

export const dialogTitle = style({
  fontSize: "1.25rem",
  fontWeight: 700,
  textAlign: "center",
});

export const dialogDescription = style({
  textAlign: "center",
  lineHeight: "1.5",
  fontSize: "0.95rem",
});

export const dialogCloseAction = style({
  width: "100%",
  marginTop: "8px",
});

export const infoText = style({
  fontSize: "12px",
  color: vars.color.descriptionText,
  textAlign: "center",
  width: "100%",
  marginTop: "auto",
  marginBottom: "16px",
});
