import { vars } from "@internal/design-system/style";
import { appStyle } from "../../../style/utils";

export const resendButton = appStyle({
  color: vars.color.gray200,
  ":hover": {
    color: vars.color.button,
  },
});

export const verifyButton = appStyle({
  padding: `${vars.space["2"]} ${vars.space["4"]}`,
});

export const phoneTitle = appStyle({
  color: vars.color.button,
  letterSpacing: "-0.01em",
  textAlign: "left",
  textWrap: "pretty",
});

export const inputWrapper = appStyle({
  display: "flex",
  alignItems: "center",
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  borderRadius: vars.borderRadius.md,
  border: `1px solid rgba(0, 0, 0, 0.08)`,
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

export const inputWrapperError = appStyle({
  borderColor: `${vars.color.highlight}!important`,
  boxShadow: `0 0 0 1px ${vars.color.highlight}!important`,
});

export const inputField = appStyle({
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  paddingRight: "110px",
  fontSize: vars.fontSize["1rem"],
  color: vars.color.text,
  height: vars.fontSize["2rem"],
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.descriptionText,
      opacity: 0.6,
    },
  },
});

export const timerWrapper = appStyle({
  position: "absolute",
  right: vars.space["3"],
  display: "flex",
  alignItems: "center",
  gap: vars.space["2"],
});

export const timerText = appStyle({
  fontSize: "14px",
  fontWeight: "600",
  color: vars.color.button,
  fontVariantNumeric: "tabular-nums",
});

export const errorText = appStyle({
  fontSize: vars.fontSize["0.75rem"],
  color: vars.color.highlight,
  paddingLeft: vars.space["1"],
  marginTop: "2px",
});

export const srOnly = appStyle({
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
