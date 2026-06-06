import { style } from "@vanilla-extract/css";

export const closeButton = style({
  fontSize: "0.75rem",
  color: "var(--color-primary)",
  backgroundColor: "color-mix(in oklch, var(--color-text), transparent 50%)",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
});
