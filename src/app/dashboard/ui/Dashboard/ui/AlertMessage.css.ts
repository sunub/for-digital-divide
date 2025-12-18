import { style } from "@vanilla-extract/css";

export const title = style({
  fontSize: "1.25rem",
  fontWeight: 900,
});

export const description = style({
  fontSize: "0.75rem",
  color: "color-mix(in oklch, var(--color-text) 70%, transparent)",
  marginBottom: "1rem",
  lineHeight: 1.5,
});
