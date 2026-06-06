import { style } from "@vanilla-extract/css";

export const animatePresenceRootContainer = style({
  gridArea: "dashboard-content / 1",
  width: "100%",
  height: "calc(100cqh - 68px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
});
