import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const chartRootContainer = style({
  zIndex: 1000,
});

export const chartPeriodSelectContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  fontSize: 14,
  color: "#333",
});

export const chartPeriodLabel = style({
  marginRight: 10,
  fontWeight: "bold",
});

export const chartGraphContainer = style({
  position: "relative",
  maxWidth: "calc(100cqw - 2rem)",
  width: "100%",
  margin: "0 auto",
  overflowX: "auto",
});

export const chartPeriodRange = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const chartPeriodSelectRecipe = recipe({
  base: chartPeriodSelectContainer,
  variants: {
    size: {
      small: { fontSize: 12 },
      medium: { fontSize: 14 },
      large: { fontSize: 16 },
    },
    color: {
      default: { color: "#333" },
      primary: { color: "#0070f3" },
    },
  },
  defaultVariants: {
    size: "medium",
    color: "default",
  },
});
