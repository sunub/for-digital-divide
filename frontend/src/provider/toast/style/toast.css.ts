import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "3.5rem",
  left: "50%",
  width: "100%",
  transform: "translateX(-50%) translateY(10px)",
  flexDirection: "column",
  zIndex: vars.zIndex.toast || 9999,
});

export const message = recipe({
  base: {
    width: "calc(100% - 32px)",
    maxWidth: "340px",
    backgroundColor: vars.color.white,
    border: "1px solid #e2e2e2",
    borderRadius: "16px",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
  },
  variants: {
    type: {
      success: {},
      error: {},
      info: {},
      warning: {},
    },
  },
});

export const iconContainer = recipe({
  base: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  variants: {
    type: {
      success: { backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" },
      error: { backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444" },
      info: { backgroundColor: "rgba(147, 103, 239, 0.1)", color: "#9367ef" },
      warning: { backgroundColor: "rgba(249, 115, 22, 0.1)", color: "#f97316" },
    },
  },
});

export const headerRow = style({
  width: "100%",
  marginBottom: "4px",
});

export const typeTitle = recipe({
  base: {
    fontSize: "0.875rem",
    fontWeight: 700,
  },
  variants: {
    type: {
      success: { color: "#22c55e" },
      error: { color: "#ef4444" },
      info: { color: "#9367ef" },
      warning: { color: "#f97316" },
    },
  },
});

export const timestamp = style({
  fontSize: "0.75rem",
  color: "#5f5d69",
});

export const bodyText = style({
  width: "100%",
  wordBreak: "keep-all",
  textAlign: "left",
  fontSize: "0.875rem",
  lineHeight: "1.4",
  color: "#1a1c1c",
});

export const strongText = style({
  fontWeight: 700,
  color: "#9367ef",
});

export const strongOtpText = style({
  fontWeight: 700,
  color: "#9367ef",
  fontSize: "1.25rem",
  lineHeight: "1.2",
});
