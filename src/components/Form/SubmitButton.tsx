"use client";

import type { ButtonProps } from "@/components/3DButton";
import { _3DButton } from "@/components/3DButton";
import { Flex } from "@/shared/ui/Flex";

interface SubmitButtonProps extends Omit<ButtonProps, "children" | "type"> {
  isPending: boolean;
}

export function SubmitButton({ isPending, ...props }: SubmitButtonProps) {
  return (
    <Flex placeItems={"center"}>
      <_3DButton
        type="submit"
        status={isPending ? "pending" : "idle"}
        disabled={isPending}
        {...props}
      >
        확인
      </_3DButton>
    </Flex>
  );
}
