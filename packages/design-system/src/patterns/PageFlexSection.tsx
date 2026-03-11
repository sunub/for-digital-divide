import type { ComponentProps } from "react";
import { Flex } from "../primitives/Flex";

export interface PageFlexSectionProps
  extends Omit<
    ComponentProps<typeof Flex>,
    "placeItems" | "width" | "marginLeft" | "marginRight"
  > {
  contentWidth?: ComponentProps<typeof Flex>["maxWidth"];
}

export function PageFlexSection({
  padding = 8,
  ...props
}: PageFlexSectionProps) {
  return (
    <Flex
      placeItems="center"
      width="full"
      marginLeft="auto"
      marginRight="auto"
      padding={padding}
      position="relative"
      zIndex="modal"
      {...props}
    />
  );
}
