import clsx from "clsx";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { VERIFY_INFO_FIELD_IDS, type VerifyFormData } from "./form";
import * as styles from "./VerifyInfoStep.css";

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
    <div className={styles.inputGroup}>
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
        <div className={styles.dropdownWrapper}>
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
        </div>
      </div>
      {hasError && errorMessage && errorId && (
        <span id={errorId} className={styles.errorText} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
