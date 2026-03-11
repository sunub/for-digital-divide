import type { ComponentProps } from "react";
import { Flex } from "../primitives/Flex";

export interface StackProps
  extends Omit<ComponentProps<typeof Flex>, "direction" | "gap"> {
  space?: ComponentProps<typeof Flex>["gap"];
}

export function Stack({ space = 4, ...props }: StackProps) {
  return <Flex direction="column" gap={space} {...props} />;
}
