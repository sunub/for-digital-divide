import { style } from "@vanilla-extract/css";
import { designSystemLayer } from "./layers.css";

export const flexCenter = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const flexColumnCenter = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const flexSpaceBetween = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export const flexColumnSpaceBetween = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export const flexAlignStart = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
});

export const flexColumnAlignStart = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
});

export const flexAlignEnd = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
});

export const flexColumnAlignEnd = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
});
