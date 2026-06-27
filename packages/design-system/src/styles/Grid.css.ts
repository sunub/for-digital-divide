import { style } from "@vanilla-extract/css";
import { designSystemLayer } from "./layers.css";

export const gridCenter = style({
  "@layer": {
    [designSystemLayer]: {
      display: "grid",
      placeItems: "center",
    },
  },
});

export const gridFlexStart = style({
  "@layer": {
    [designSystemLayer]: {
      display: "grid",
      justifyItems: "start",
    },
  },
});

export const gridLayout = style({
  "@layer": {
    [designSystemLayer]: {
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100%",
      gridTemplateColumns: "1fr .65fr",
      gridTemplateRows: "1fr",
    },
  },
});
