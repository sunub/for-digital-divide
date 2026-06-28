import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";
import { appStyle } from "../../../style/utils";

export const inputLabel = appStyle({
  fontSize: "14px",
  fontWeight: "600",
  color: vars.color.text,
  paddingLeft: vars.space["1"],
});

export const inputWrapper = appStyle({
  display: "flex",
  alignItems: "center",
  padding: `${vars.space["3"]} ${vars.space["4"]}`,
  borderRadius: vars.borderRadius.md,
  border: `1px solid rgba(0, 0, 0, 0.08)`,
  backgroundColor: vars.color.white,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.button,
      boxShadow: `0 0 0 1px ${vars.color.button}`,
    },
  },
});

export const inputWrapperError = appStyle({
  borderColor: `${vars.color.highlight} !important`,
  boxShadow: `0 0 0 1px ${vars.color.highlight} !important`,
});

export const inputField = appStyle({
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  fontSize: vars.fontSize["1rem"],
  color: vars.color.text,
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.descriptionText,
      opacity: 0.6,
    },
  },
});

export const rrnFrontField = style([
  inputField,
  appStyle({
    width: "80px",
  }),
]);

export const rrnSeparator = appStyle({
  color: vars.color.descriptionText,
  flexShrink: 0,
});

export const rrnBackField = style([
  inputField,
  appStyle({
    width: "24px",
    textAlign: "center",
  }),
]);

export const rrnMask = appStyle({
  fontSize: vars.fontSize["0.75rem"],
  letterSpacing: "0.2em",
  color: vars.color.text,
  paddingTop: "2px",
  marginLeft: vars.space["1"],
  userSelect: "none",
});

export const errorText = appStyle({
  fontSize: vars.fontSize["0.75rem"],
  color: vars.color.highlight,
  paddingLeft: vars.space["1"],
  marginTop: "2px",
});
