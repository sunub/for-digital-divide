"use client";

import {
  ThreeDButton,
  type ThreeDButtonProps,
} from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";

interface SubmitButtonProps
  extends Omit<ThreeDButtonProps, "children" | "type"> {
  isPending: boolean;
}

export function SubmitButton({ isPending, ...props }: SubmitButtonProps) {
  return (
    <Flex placeItems={"center"}>
      <ThreeDButton
        type="submit"
        status={isPending ? "pending" : "idle"}
        disabled={isPending}
        {...props}
      >
        확인
      </ThreeDButton>
    </Flex>
  );
}
