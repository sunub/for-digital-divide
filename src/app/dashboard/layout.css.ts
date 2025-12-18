import { style } from "@vanilla-extract/css";

export const dashboardRootContainer = style({
  display: "grid",
  gridTemplateRows: "68px 1fr",
  gridTemplateAreas: `
    "dashboard-header"
    "dashboard-content"
  `,
  overflowX: "hidden",
  overflowY: "scroll",
  width: "100%",
  height: "100%",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const dashboardContentContainer = style({
  gridArea: "dashboard-content",
});
