import { style } from "@vanilla-extract/css";

export const gridCenter = style({
  display: "grid",
  placeItems: "center",
});

export const gridFlexStart = style({
  display: "grid",
  justifyItems: "start",
});

export const gridLayout = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
  gridTemplateColumns: "1fr .65fr",
  gridTemplateRows: "1fr",
});
