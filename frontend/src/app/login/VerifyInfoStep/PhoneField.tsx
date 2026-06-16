import { TextField } from "@internal/design-system/components";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  formatPhoneNumber,
  VERIFY_INFO_FIELD_IDS,
  type VerifyFormData,
} from "./form";

interface PhoneFieldProps {
  control: Control<VerifyFormData>;
  hasError: boolean;
  errorMessage?: string;
}

export function PhoneField({
  control,
  hasError,
  errorMessage,
}: PhoneFieldProps) {
  return (
    <Controller
      name="phone"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={VERIFY_INFO_FIELD_IDS.phone}
          name="phone"
          type="tel"
          labelContent="휴대폰번호"
          placeholder="010-0000-0000"
          autoComplete="tel-national"
          inputMode="numeric"
          isError={hasError}
          errorMessage={errorMessage}
          onChange={(e) => {
            field.onChange(formatPhoneNumber(e.target.value));
          }}
        />
      )}
    />
  );
}
