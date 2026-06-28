import { Box, Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { VERIFY_INFO_FIELD_IDS, type VerifyFormData } from "./form";
import * as styles from "./CarrierField.css";

interface CarrierFieldProps {
  control: Control<VerifyFormData>;
  hasError: boolean;
  errorMessage?: string;
  errorId?: string;
}

export function CarrierField({
  control,
  hasError,
  errorMessage,
  errorId,
}: CarrierFieldProps) {
  return (
    <Flex direction="column" gap={1} width="full">
      <label
        htmlFor={VERIFY_INFO_FIELD_IDS.carrier}
        className={styles.inputLabel}
      >
        통신사
      </label>
      <div
        className={clsx(
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
        )}
      >
        <Box position="relative" width="full">
          <Controller
            name="carrier"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                id={VERIFY_INFO_FIELD_IDS.carrier}
                name="carrier"
                className={styles.selectDropdown}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
              >
                <option value="SKT">SKT</option>
                <option value="KT">KT</option>
                <option value="LG">LG U+</option>
              </select>
            )}
          />
        </Box>
      </div>
      {hasError && errorMessage && errorId && (
        <span id={errorId} className={styles.errorText} role="alert">
          {errorMessage}
        </span>
      )}
    </Flex>
  );
}
