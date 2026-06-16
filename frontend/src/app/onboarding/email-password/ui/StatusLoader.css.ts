import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const loaderContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.5rem",
  minWidth: "250px",
  paddingLeft: "1rem",
});

export const iconWrapper = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const textWrapper = style({
  fontSize: "1rem",
  fontWeight: 600,
  color: "#4a5568",
  textAlign: "center",
});

export const text = recipe({
  base: {
    transition: "color 0.3s ease-in-out",
    color: "#4a5568",
  },
  variants: {
    status: {
      success: { color: "#38a169" },
      error: { color: "#e53e3e" },
      default: { color: "#4a5568" },
    },
  },
  defaultVariants: {
    status: "default",
  },
});
