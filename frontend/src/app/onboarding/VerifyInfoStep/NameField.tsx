import { TextField } from "@internal/design-system/components";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { VERIFY_INFO_FIELD_IDS, type VerifyFormData } from "./form";

interface NameFieldProps {
  control: Control<VerifyFormData>;
  hasError: boolean;
  errorMessage?: string;
}

export function NameField({ control, hasError, errorMessage }: NameFieldProps) {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={VERIFY_INFO_FIELD_IDS.name}
          name="name"
          labelContent="이름"
          placeholder="2자 이상 입력"
          autoComplete="name"
          isError={hasError}
          errorMessage={errorMessage}
        />
      )}
    />
  );
}
