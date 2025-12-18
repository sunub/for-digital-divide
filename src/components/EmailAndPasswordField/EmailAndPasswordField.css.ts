import { recipe } from "@vanilla-extract/recipes";

export const errorText = recipe({
  base: {
    fontSize: "0.65rem",
    paddingBottom: "0.25rem",
    fontWeight: 700,
    transition: "opacity 0.3s ease-in-out",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "70cqw",
  },
  variants: {
    isVisible: {
      true: {
        color: "var(--input-invalid)",
        opacity: 1,
      },
      false: {
        color: "var(--color-text)",
        opacity: 0.7,
      },
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});
