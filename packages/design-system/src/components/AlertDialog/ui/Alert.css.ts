import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../styles";

export const portalContainer = recipe({
  base: {
    inset: 0,
    zIndex: 9999,
  },
  variants: {
    isGlobal: {
      true: {
        position: "fixed",
      },
      false: {
        position: "absolute",
      },
    },
  },
});

export const overlay = recipe({
  base: {
    position: "absolute",
    inset: 0,
    backgroundColor: "oklch(0.2158 0.0666 288.17775174927874 / 50%)",
    backdropFilter: "blur(10px)",
    zIndex: 40,
    pointerEvents: "auto",
  },
  variants: {
    state: {
      open: { animation: `fadeIn 0.2s ease-out` },
      closed: { animation: `fadeOut 0.2s ease-in` },
    },
  },
});

export const content = recipe({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:
      "color-mix(in oklch, var(--color-transparent) 0%, var(--color-background))",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 50,
    minWidth: "300px",
    maxWidth: "100cqw",
    pointerEvents: "auto",
    ":focus": {
      outline: "none",
    },
  },
  variants: {
    state: {
      open: { animation: `contentShow 0.2s ease-out` },
      closed: { animation: `contentHide 0.2s ease-in` },
    },
  },
});

export const alertDialogTrigger = recipe({
  base: {
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
    selectors: {
      "&:hover": {
        border: `1px solid ${vars.color.accent}`,
      },
      '&[data-state="open"]': {
        outline: "2px solid #f87171",
      },
    },
  },
  variants: {
    state: {
      open: {},
      closed: {},
    },
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  textAlign: "center",
  marginBottom: "16px",
});

export const footer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "24px",
  width: "100%",
});

export const title = style({
  fontSize: "1.25rem",
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  margin: 0,
});

export const description = style({
  fontSize: "0.875rem",
  color: vars.color.descriptionText,
  margin: 0,
  lineHeight: 1.5,
});
