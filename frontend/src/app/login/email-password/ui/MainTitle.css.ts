import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--gugi-font-family)",
});

export const title = style({
  textAlign: "center",
  fontSize: "3rem",
  fontWeight: 600,
  color: "oklch(63.93% 0.206 288.34)",
});

export const description = style({
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%)",
  fontSize: "1rem",
  marginTop: "0.5rem",
  fontWeight: 400,
});
