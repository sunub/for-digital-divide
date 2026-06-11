import { style } from "@vanilla-extract/css";

export const panel = style({
  containerName: "instruction-panel",
  containerType: "size",
  boxSizing: "border-box",
  padding: "4cqw",
  gap: "4cqw",
  backgroundColor: "transparent",
  overflowY: "auto",
  overflowX: "hidden",
});
