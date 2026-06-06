import { style } from "@vanilla-extract/css";

export const dashboardRootContainer = style({
  gridTemplateRows: "68px 1fr",
  gridTemplateAreas: `
    "dashboard-header"
    "dashboard-content"
  `,
  overflowX: "hidden",
  overflowY: "scroll",

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
