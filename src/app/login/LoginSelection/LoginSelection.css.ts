import { style } from "@vanilla-extract/css";

export const title = style({
  fontSize: "3rem",
  fontWeight: 600,
  fontFamily: "var(--gugi-font-family)",
  color: "oklch(63.93% 0.206 288.34)",
});

export const description = style({
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%)",
});

export const cardContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2rem",
  padding: "2rem",
});

export const signInformation = style({
  fontSize: "0.8rem",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%)",
  maxWidth: "300px",
});
