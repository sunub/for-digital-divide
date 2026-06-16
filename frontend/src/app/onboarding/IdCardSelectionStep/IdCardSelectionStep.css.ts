import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

const brandViolet = "#9367ef";
const brandVioletHover = "#8559e1";
const onSurface = "#1a1c1c";

export const root = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const content = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  paddingBottom: vars.space[8],
});

export const title = style({
  textAlign: "center",
  fontSize: "32px",
  fontWeight: vars.fontWeight.bold,
  lineHeight: "40px",
  letterSpacing: "-0.01em",
  color: onSurface,
  marginTop: vars.space[2],
  marginBottom: vars.space[6],
});

export const optionsFieldset = style({
  border: 0,
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
  whiteSpace: "nowrap",
  border: 0,
});

export const optionsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
});

export const disabledOptionTrigger = style({
  display: "block",
  width: "100%",
  outline: "none",
});

export const action = style({
  marginTop: "auto",
  paddingBottom: vars.space[2],
});

export const submitButton = style({
  width: "100%",
  height: "56px",
  backgroundColor: brandViolet,
  color: "#ffffff",
  fontWeight: vars.fontWeight.bold,
  fontSize: "18px",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(147, 103, 239, 0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  border: "none",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: brandVioletHover,
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  },
});
