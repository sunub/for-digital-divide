import { globalStyle, style } from "@vanilla-extract/css";

export const title = style({
  fontSize: "3rem",
  fontWeight: 600,
  fontFamily: "Gugi, cursive",
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

export const signLink = style({
  position: "relative",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%)",
});

globalStyle(`${signLink} > span`, {
  transition: "transform 0.2s 0.05s cubic-bezier(0.2, 0.57, 0.67, 1.53)",
});

globalStyle(`${signLink}::before`, {
  content: "''",
  position: "absolute",
  width: "100%",
  background:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 50%)",
  top: "100%",
  left: "0",
  pointerEvents: "none",

  height: "5px",
  borderRadius: "20px",
  transform: "scale3d(1, 1, 1)",
  transition:
    "transform 0.2s, opacity 0.2s cubic-bezier(0.2, 0.57, 0.67, 1.53)",
});

globalStyle(`${signLink}:hover::before`, {
  transform: "scale3d(1.2, 0.1, 1)",
  transition: "transform 0.4s cubic-bezier(0.8, 0, 0.1, 1)",
  opacity: 1,
});

globalStyle(`${signLink}:hover > span`, {
  transform: "translate3d(0, 0, 0)",
  transition: "transform 400ms cubic-bezier(0.8, 0, 0.1, 1)",
  transitionDelay: "0s",
});
