import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

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

export const errorText = style({
  fontSize: "12px",
  color: vars.color.highlight,
  paddingLeft: "4px",
  marginTop: "2px",
});

// Illustration Styles

export const hologram1 = style({
  position: "absolute",
  top: "-40px",
  left: "-40px",
  width: "192px",
  height: "192px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: "50%",
  filter: "blur(40px)",
  pointerEvents: "none",
});

export const hologram2 = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  background:
    "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
  pointerEvents: "none",
});

export const cardCountry = style({
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.5)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
});

export const cardTitle = style({
  fontSize: "20px",
  fontWeight: "bold",
  lineHeight: "1",
  color: vars.color.text,
});

export const cardNameText = style({
  fontSize: "20px",
  fontWeight: "bold",
  color: vars.color.text,
});

export const cardRrnText = style({
  fontSize: "16px",
  color: vars.color.descriptionText,
  letterSpacing: "0.1em",
  marginTop: "4px",
});

export const cardDateLabel = style({
  fontSize: "10px",
  color: "rgba(0, 0, 0, 0.4)",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const cardDateText = style({
  fontSize: "14px",
  color: vars.color.descriptionText,
});

export const cardSealInner = style({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  backgroundColor: "rgba(108, 62, 198, 0.4)",
});
