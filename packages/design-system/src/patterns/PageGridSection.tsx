import type { ComponentProps } from "react";
import { Grid } from "../primitives/Grid";

export interface PageGridSectionProps
  extends Omit<
    ComponentProps<typeof Grid>,
    "placeItems" | "width" | "marginLeft" | "marginRight"
  > {
  contentWidth?: ComponentProps<typeof Grid>["maxWidth"];
}

export function PageGridSection({
  contentWidth = "halfVw",
  minHeight = "fullCqh",
  padding = 8,
  ...props
}: PageGridSectionProps) {
  return (
    <Grid
      placeItems="center"
      width="full"
      maxWidth={contentWidth}
      minHeight={minHeight}
      marginLeft="auto"
      marginRight="auto"
      padding={padding}
      position="relative"
      zIndex="modal"
      {...props}
    />
  );
}
