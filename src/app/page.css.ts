import { style } from "@vanilla-extract/css";
import { flexColumnCenter } from "@/style/Flex.css";
import { gridCenter } from "@/style/Grid.css";

export const welcomeMessage = style([
  gridCenter,
  {
    paddingTop: "32px",
  },
]);

export const textContainer = style([
  gridCenter,
  {
    overflowY: "scroll",
    padding: "1rem 1rem",
  },
]);

export const contentWrapper = style([
  flexColumnCenter,
  {
    background: "oklch(96.88% 0.015 294.47)",
    textAlign: "start",
    height: "fit-content",
    borderRadius: "36px",
    zIndex: 11,
  },
]);

export const devsiteContentSiteContent = style([
  gridCenter,
  {
    maxWidth: "800px",
    height: "100cqh",
    padding: "5cqh 6cqh",
    zIndex: 12,
  },
]);

export const backDrop = style({
  position: "fixed",
  background: "oklch(3.53% 0 73 / 50%)",
  backdropFilter: "blur(20px)",
  zIndex: 11,
  top: "0px",
  left: "0px",
  width: "100%",
  height: "100%",
});
