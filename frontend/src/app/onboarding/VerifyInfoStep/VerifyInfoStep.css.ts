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

export const inputLabel = style({
  fontSize: "14px",
  fontWeight: "600",
  color: vars.color.text,
  paddingLeft: "4px",
});

export const inputWrapper = style({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "12px",
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

export const inputWrapperError = style({
  borderColor: `${vars.color.highlight} !important`,
  boxShadow: `0 0 0 1px ${vars.color.highlight} !important`,
});

export const inputField = style({
  width: "100%",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
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

export const rrnSplitWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
});

export const rrnFrontField = style([
  inputField,
  {
    width: "80px",
  },
]);

export const rrnSeparator = style({
  color: vars.color.descriptionText,
  flexShrink: 0,
});

export const rrnBackFieldWrapper = style({
  display: "flex",
  alignItems: "center",
  flex: 1,
});

export const rrnBackField = style([
  inputField,
  {
    width: "24px",
    textAlign: "center",
  },
]);

export const rrnMask = style({
  fontSize: "12px",
  letterSpacing: "0.2em",
  color: vars.color.text,
  paddingTop: "2px",
  marginLeft: "4px",
  userSelect: "none",
});

export const dropdownWrapper = style({
  position: "relative",
  width: "100%",
});

export const selectDropdown = style([
  inputField,
  {
    cursor: "pointer",
    appearance: "none",
    width: "100%",
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235f5d69' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0px center",
    paddingRight: "24px",
  },
]);

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
