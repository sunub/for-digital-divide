import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import { type Control, Controller } from "react-hook-form";
import {
  formatOtpAccessibleTime,
  formatOtpTimer,
  normalizeOtpInput,
  OTP_CODE_LENGTH,
  OTP_FIELD_IDS,
  type OtpFormData,
} from "./form";
import * as styles from "./VerifyOtpStep.css";

interface OtpCodeFieldProps {
  control: Control<OtpFormData>;
  hasError: boolean;
  errorMessage: string | undefined;
  timeLeft: number;
  onExtendTime: () => void;
}

export function OtpCodeField({
  control,
  hasError,
  errorMessage,
  timeLeft,
  onExtendTime,
}: OtpCodeFieldProps) {
  const describedBy = hasError
    ? `${OTP_FIELD_IDS.timer} ${OTP_FIELD_IDS.error}`
    : OTP_FIELD_IDS.timer;

  return (
    <Flex direction="column" gap={1} width="full">
      <label htmlFor={OTP_FIELD_IDS.input} className={styles.srOnly}>
        인증번호 6자리 입력
      </label>

      <div
        className={clsx(styles.inputWrapper, {
          [styles.inputWrapperError]: hasError,
        })}
      >
        <Controller
          name="otpCode"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={OTP_FIELD_IDS.input}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={OTP_CODE_LENGTH}
              placeholder="인증번호 입력"
              className={styles.inputField}
              aria-invalid={hasError}
              aria-describedby={describedBy}
              onChange={(event) => {
                field.onChange(normalizeOtpInput(event.target.value));
              }}
            />
          )}
        />

        <div className={styles.timerWrapper}>
          <span id={OTP_FIELD_IDS.timer} className={styles.srOnly}>
            인증번호 입력 남은 시간 {formatOtpAccessibleTime(timeLeft)}
          </span>
          <time
            className={styles.timerText}
            dateTime={`PT${timeLeft}S`}
            aria-hidden
          >
            {formatOtpTimer(timeLeft)}
          </time>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onExtendTime}
          >
            시간 연장
          </Button>
        </div>
      </div>

      {hasError ? (
        <Text
          as="span"
          id={OTP_FIELD_IDS.error}
          className={styles.errorText}
          role="alert"
        >
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}
