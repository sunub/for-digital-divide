import { style } from "@vanilla-extract/css";

export const rootContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Gugi, cursive",
  width: "100%",
  flexDirection: "column",
  color: "var(--color-accent)",
  fontSize: "2rem",
  fontWeight: 600,
  paddingTop: "2.5rem",
  paddingBottom: "2rem",
});

export const titleContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const svg = style({
  color: "currentColor",
  stroke: "currentColor",
  fill: "currentColor",
});
