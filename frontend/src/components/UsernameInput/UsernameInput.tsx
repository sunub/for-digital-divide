"use client";

import { TextField } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { UserIcon } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import type { FormSchemaType } from "@/app/sign-up/register-user/types";

interface UsernameFieldProps {
  control: Control<FormSchemaType>;
  hasError: boolean;
  errorMessage?: string;
}

export function UsernameInput({ control, hasError }: UsernameFieldProps) {
  return (
    <Flex direction={"column"} width={"full"}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="register-username"
            name="username"
            isError={hasError}
            errorMessage={
              hasError
                ? "2자 이상 20자 이하의 한글 또는 영문 대소문자만 사용할 수 있습니다."
                : ""
            }
            labelContent="사용자 이름을 입력해주세요"
            autoComplete="username"
            leftElement={<UserIcon size={16} />}
          />
        )}
      />
    </Flex>
  );
}
