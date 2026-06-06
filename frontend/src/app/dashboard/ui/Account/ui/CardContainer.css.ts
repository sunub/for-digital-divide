import { createVar, style } from "@vanilla-extract/css";

export const gridTemplateRow = createVar();
export const gridTemplateColumn = createVar();

export const mxVar = createVar();
export const myVar = createVar();

export const grid = style({
  vars: {
    [gridTemplateRow]: "auto",
    [gridTemplateColumn]: "auto",
    [mxVar]: "0px",
    [myVar]: "0px",
  },
  display: "grid",
  gridTemplateRows: gridTemplateRow,
  gridTemplateColumns: gridTemplateColumn,
});
