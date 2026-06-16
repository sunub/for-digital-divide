import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

export const phoneContentLayout = style({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  paddingTop: "24px",
  height: "100%",
  boxSizing: "border-box",
  justifyContent: "space-between",
  gap: "24px",
  width: "100%",
});

export const headerContainer = style({
  marginBottom: "32px",
});

export const phoneTitle = style({
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  color: vars.color.button,
  letterSpacing: "-0.01em",
  textAlign: "left",
});

export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
});

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "100%",
});

export const inputWrapper = style({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: vars.color.white,
  position: "relative",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.button,
      boxShadow: `0 0 0 1px ${vars.color.button}`,
    },
  },
});

export const inputWrapperError = style({
  borderColor: `${vars.color.highlight} !important`,
  boxShadow: `0 0 0 1px ${vars.color.highlight} !important`,
});

export const inputField = style({
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  paddingRight: "110px",
  fontSize: "16px",
  color: vars.color.text,
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.descriptionText,
      opacity: 0.6,
    },
  },
});

export const timerWrapper = style({
  position: "absolute",
  right: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const timerText = style({
  fontSize: "14px",
  fontWeight: "600",
  color: vars.color.button,
  fontVariantNumeric: "tabular-nums",
});

export const resendContainer = style({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});

export const errorText = style({
  fontSize: "12px",
  color: vars.color.highlight,
  paddingLeft: "4px",
  marginTop: "2px",
});

export const buttonContainer = style({
  marginTop: "auto",
  paddingTop: "24px",
  width: "100%",
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});
