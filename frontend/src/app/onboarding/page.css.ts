import { style } from "@vanilla-extract/css";

export const gridStyle = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "1fr",
});
