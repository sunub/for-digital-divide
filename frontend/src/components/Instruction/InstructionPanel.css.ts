import { style } from "@vanilla-extract/css";

export const panel = style({
  containerName: "instruction-panel",
  containerType: "size",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  padding: "4cqw",
  gap: "4cqw",
  backgroundColor: "transparent",
  overflowY: "auto",
  overflowX: "hidden",
  position: "relative",
});
