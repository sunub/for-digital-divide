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

// Illustration Styles
export const illustrationCard = style({
  width: "100%",
  aspectRatio: "1.6 / 1",
  backgroundColor: "rgba(108, 62, 198, 0.1)", // Light primary
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "32px",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  border: "1px solid rgba(108, 62, 198, 0.2)",
});

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

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  zIndex: 10,
  marginBottom: "16px",
});

export const cardTitleGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
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

export const cardPhoto = style({
  width: "80px",
  height: "96px",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(4px)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
});

export const cardInfo = style({
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
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

export const cardFooter = style({
  marginTop: "auto",
  zIndex: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const cardDateGroup = style({
  display: "flex",
  flexDirection: "column",
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

export const cardSeal = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "rgba(108, 62, 198, 0.1)",
  border: "1px solid rgba(108, 62, 198, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
});

export const cardSealInner = style({
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  backgroundColor: "rgba(108, 62, 198, 0.4)",
});
