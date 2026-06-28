import { TextField } from "@internal/design-system/components";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  formatIssueDate,
  ID_CARD_FIELD_IDS,
  type IdCardFormData,
} from "../form";

interface IssueDateFieldProps {
  control: Control<IdCardFormData>;
  hasError: boolean;
  errorMessage?: string;
}

export function IssueDateField({
  control,
  hasError,
  errorMessage,
}: IssueDateFieldProps) {
  return (
    <Controller
      name="issueDate"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={ID_CARD_FIELD_IDS.issueDate}
          name="issueDate"
          labelContent="발급일자"
          placeholder="YYYY.MM.DD"
          autoComplete="off"
          inputMode="numeric"
          isError={hasError}
          errorMessage={errorMessage}
          onChange={(e) => {
            field.onChange(formatIssueDate(e.target.value));
          }}
        />
      )}
    />
  );
}
