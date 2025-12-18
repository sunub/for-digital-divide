import type { ComponentProps } from "react";
import { Box } from "./Box";

interface GridProps extends Omit<ComponentProps<typeof Box>, "display"> {
  direction?: "row" | "column";
}

export function Grid(props: GridProps) {
  return <Box display="grid" {...props} />;
}
