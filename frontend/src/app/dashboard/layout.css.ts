import { style } from "@vanilla-extract/css";

export const dashboardRootContainer = style({
  paddingTop: ".5rem",
  gridTemplateRows: "68px 1fr",
  gridTemplateAreas: `
    "dashboard-header"
    "dashboard-content"
  `,
  overflow: "hidden",

  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const dashboardContentContainer = style({
  gridArea: "dashboard-content",
  width: "100%",
  height: "100%",
  minHeight: 0,
  overflowY: "auto",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
