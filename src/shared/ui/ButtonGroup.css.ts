import { globalStyle, style } from "@vanilla-extract/css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

const horizontalGroup = style({});
const verticalGroup = style({
  flexDirection: "column",
});

globalStyle(`${horizontalGroup} > *:not(:first-child)`, {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeftWidth: 0,
});

globalStyle(`${horizontalGroup} > *:not(:last-child)`, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

globalStyle(`${verticalGroup} > *:not(:first-child)`, {
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderTopWidth: 0,
});

globalStyle(`${verticalGroup} > *:not(:last-child)`, {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

export const buttonGroup = recipe({
  base: {
    display: "flex",
    alignItems: "stretch",
    border: "none",
  },
  variants: {
    orientation: {
      horizontal: horizontalGroup,
      vertical: verticalGroup,
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

globalStyle(`${buttonGroup({})} > *:focus-visible`, {
  zIndex: 10,
  position: "relative",
});

globalStyle(`${buttonGroup({})} :has([data-slot="button-group"])`, {
  gap: "2rem",
});

export type ButtonGroupVariants = RecipeVariants<typeof buttonGroup>;
