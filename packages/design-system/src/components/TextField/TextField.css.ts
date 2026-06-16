import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../tokens/theme.css";

export const inputGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "100%",
});

export const inputWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "12px",
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
  },
  variants: {
    isError: {
      true: {
        borderColor: `${vars.color.highlight} !important`,
        boxShadow: `0 0 0 1px ${vars.color.highlight} !important`,
      },
      false: {},
    },
  },
  defaultVariants: {
    isError: false,
  },
});

export const inputField = style({
  flex: 1,
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  fontSize: "16px",
  color: vars.color.text,
  outline: "none",
  minWidth: 0,
  fontFamily: "Segoe UI, Apple SD Gothic Neo, sans-serif",
  selectors: {
    "&::placeholder": {
      color: vars.color.descriptionText,
      opacity: 0.6,
    },
  },
});

export const leftElementWrapper = style({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  color: vars.color.descriptionText,
});

export const rightElementWrapper = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "8px",
});

export const labelStyle = style({
  fontSize: "14px",
  fontWeight: "600",
  color: vars.color.text,
  marginBottom: "4px",
  display: "block",
});

export const errorText = style({
  fontSize: "12px",
  color: vars.color.highlight,
  paddingLeft: "4px",
  marginTop: "2px",
});
