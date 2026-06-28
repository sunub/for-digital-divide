import { TextField } from "@internal/design-system/components";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ID_CARD_FIELD_IDS, type IdCardFormData } from "../form";

interface NameFieldProps {
  control: Control<IdCardFormData>;
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
          id={ID_CARD_FIELD_IDS.name}
          name="name"
          labelContent="이름"
          placeholder="이름을 입력해 주세요"
          autoComplete="name"
          isError={hasError}
          errorMessage={errorMessage}
        />
      )}
    />
  );
}
