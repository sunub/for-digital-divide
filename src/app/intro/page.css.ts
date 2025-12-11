import { globalStyle, style } from "@vanilla-extract/css";
import { flexColumnCenter } from "@/style/Flex.css";
import { gridCenter } from "@/style/Grid.css";
import { fullDvwSize } from "@/style/Size.css";

export const container = style([
  flexColumnCenter,
  fullDvwSize,
  {
    backgroundColor: 'var("--color-background")',
    zIndex: 3,
  },
]);

export const phoneContainer = style([
  gridCenter,
  {
    width: "100%",
    height: "fit-content",
  },
]);

export const title = style([
  flexColumnCenter,
  {
    width: "100%",
    gap: "1.25rem",
    fontFamily: "'Gugi', sans-serif",
    willChange: "transform",
  },
]);

globalStyle(`${title} > svg`, {
  transform: "scale(1.25) rotate(-90deg)",
});
