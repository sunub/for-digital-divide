import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import { type RefObject, useId } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  sanitizeResidentBack,
  sanitizeResidentFront,
  VERIFY_INFO_FIELD_IDS,
  type VerifyFormData,
} from "./form";
import * as styles from "./VerifyInfoStep.css";

interface ResidentNumberFieldProps {
  control: Control<VerifyFormData>;
  residentBackRef: RefObject<HTMLInputElement | null>;
  hasError: boolean;
  errorMessage?: string;
  errorId?: string;
}

export function ResidentNumberField({
  control,
  residentBackRef,
  hasError,
  errorMessage,
  errorId,
}: ResidentNumberFieldProps) {
  const groupLabelId = useId();

  return (
    <Flex direction="column" gap={1} width="full">
      <label
        id={groupLabelId}
        htmlFor={VERIFY_INFO_FIELD_IDS.residentFront}
        className={styles.inputLabel}
      >
        주민등록번호
      </label>
      <div
        className={clsx(
          styles.inputWrapper,
          hasError && styles.inputWrapperError,
        )}
      >
        <Flex alignItems="center" gap={2} width="full">
          <Controller
            name="residentFront"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id={VERIFY_INFO_FIELD_IDS.residentFront}
                name="residentFront"
                type="text"
                maxLength={6}
                placeholder="앞 6자리"
                autoComplete="off"
                inputMode="numeric"
                pattern="\d*"
                className={styles.rrnFrontField}
                aria-labelledby={groupLabelId}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                onChange={(e) => {
                  const residentFront = sanitizeResidentFront(e.target.value);
                  field.onChange(residentFront);

                  if (residentFront.length === 6) {
                    residentBackRef.current?.focus();
                  }
                }}
              />
            )}
          />

          <span className={styles.rrnSeparator} aria-hidden>
            -
          </span>

          <Flex alignItems="center" style={{ flex: 1 }}>
            <Controller
              name="residentBack"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={VERIFY_INFO_FIELD_IDS.residentBack}
                  name="residentBack"
                  type="password"
                  maxLength={1}
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="\d*"
                  className={styles.rrnBackField}
                  aria-labelledby={groupLabelId}
                  aria-label="주민등록번호 뒷자리 첫 번째 숫자"
                  aria-invalid={hasError}
                  aria-describedby={hasError ? errorId : undefined}
                  ref={(element) => {
                    field.ref(element);
                    residentBackRef.current = element;
                  }}
                  onChange={(e) => {
                    field.onChange(sanitizeResidentBack(e.target.value));
                  }}
                />
              )}
            />
            <span className={styles.rrnMask} aria-hidden>
              ●●●●●●
            </span>
          </Flex>
        </Flex>
      </div>
      {hasError && errorMessage && errorId && (
        <span id={errorId} className={styles.errorText} role="alert">
          {errorMessage}
        </span>
      )}
    </Flex>
  );
}
