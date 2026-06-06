import {
  baseStyles,
  gridCenter,
} from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";

export const welcomeMessage = style([
  gridCenter,
  baseStyles({ paddingTop: 8 }),
]);

export const textContainer = style([
  gridCenter,
  {
    overflowY: "scroll",
    padding: "1rem 1rem",
  },
]);

export const contentWrapper = style([
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
  backdropFilter: "blur(20px)",
});
