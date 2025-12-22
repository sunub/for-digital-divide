import { createVar, fallbackVar, globalStyle } from "@vanilla-extract/css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";

const widthVar = createVar();

export const buttonGroup = recipe({
  base: {
    display: "flex",
    width: fallbackVar(widthVar, "fit-content"),
    alignItems: "stretch",
  },
  variants: {
    orientation: {
      horizontal: {
        selectors: {
          "& > *:not(:first-child)": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeftWidth: 0,
          },
          "& > *:not(:last-child)": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
      vertical: {
        flexDirection: "column",
        selectors: {
          "& > *:not(:first-child)": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderTopWidth: 0,
          },
          "& > *:not(:last-child)": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

globalStyle(`${buttonGroup} > *:focus-visible`, {
  zIndex: 10,
  position: "relative",
});

globalStyle(`&:has([data-slot="button-group"])`, {
  gap: "2rem",
});

export type ButtonGroupVariants = RecipeVariants<typeof buttonGroup>;
