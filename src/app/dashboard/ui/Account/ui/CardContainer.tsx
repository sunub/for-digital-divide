"use client";

import { Grid } from "@for-digital-divide/design-system";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as style from "./CardContainer.css";

const GRID_USES_TYPE = ["chart", "default"];
const GRID_USES_AREAS: Record<
  (typeof GRID_USES_TYPE)[number],
  { row: string; column: string }
> = {
  chart: {
    row: "1fr",
    column: "[sidebar] 200px [content-start] auto [content-end]",
  },
  default: {
    row: "auto",
    column: "auto",
  },
};

interface CardContainerProps extends React.ComponentProps<typeof Grid> {
  type?: (typeof GRID_USES_TYPE)[number];
  children: React.ReactNode;
}

export function CardContainer({
  type = "default",
  children,
  ref,
  ...props
}: CardContainerProps) {
  return (
    <Grid
      className={style.grid}
      style={assignInlineVars({
        [style.gridTemplateRow]: GRID_USES_AREAS[type]?.row,
        [style.gridTemplateColumn]: GRID_USES_AREAS[type]?.column,
      })}
      {...props}
    >
      {children}
    </Grid>
  );
}
