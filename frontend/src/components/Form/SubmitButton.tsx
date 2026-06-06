"use client";

import {
  Flex,
  ThreeDButton,
  type ThreeDButtonProps,
} from "@for-digital-divide/design-system";

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
