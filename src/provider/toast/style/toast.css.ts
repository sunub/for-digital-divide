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
  zIndex: 1000,
});

export const message = recipe({
  base: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "100%",
    minWidth: "25rem",
    maxWidth: "25rem",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    margin: "0.5rem",
    borderRadius: "0.25rem",
    color: "white",

    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.17)",
    backdropFilter: "blur(10px)",
  },
  variants: {
    type: {
      success: {
        border:
          "2px solid color-mix(in oklch, oklch(0.8 0.1624 144.21), oklch(0.6731 0.1332 183.57) 40%)",
        backgroundColor:
          "color-mix(in oklch, color-mix(in oklch, oklch(0.6731 0.1624 144.21), oklch(0.6731 0.1332 183.57) 40%), transparent)",
      },
      error: {
        border:
          "2px solid color-mix(in oklch, oklch(0.8 0.2153 28.81), oklch(0.9 0.2097 358.28) 50%)",
        backgroundColor:
          "color-mix(in oklch, color-mix(in oklch, oklch(0.6427 0.2153 28.81), oklch(0.7558 0.2097 358.28) 50%), transparent)",
      },
      info: {
        backgroundColor:
          "color-mix(in oklch, oklch(0.6582 0.169 248.81), transparent)",
      },
      warning: {
        backgroundColor:
          "color-mix(in oklch, oklch(0.7805 0.1776 64.05), transparent)",
      },
    },
  },
});

export const icon = style({
  width: "1.5rem",
  height: "1.5rem",
  color: "white",
});

export const successIconContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  gap: "0.25rem",
});

export const text = style({
  width: "100%",
  maxWidth: "20rem",
  wordBreak: "keep-all",
  textAlign: "center",
});
