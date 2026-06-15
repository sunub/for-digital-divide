"use client";

import { useInterval } from "@/shared/hooks/useInterval";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "../utils/zodResolver";
import { OtpToastMessage } from "../ui/ToastMessage";
import * as styles from "./VerifyOtpStep.css";
import clsx from "clsx";
import { FaAngleRight } from "react-icons/fa";

interface StepProps {
  onNext: () => void;
}

const otpSchema = z.object({
  otpCode: z
    .string()
    .min(1, { message: "인증번호를 입력해 주세요." })
    .regex(/^\d{6}$/, { message: "인증번호는 6자리 숫자여야 합니다." }),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOtpStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const [timeLeft, setTimeLeft] = useState(180);
  const [generatedOtp, setGeneratedOtp] = useState(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  });

  useInterval(
    () => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    },
    timeLeft > 0 ? 1000 : null,
  );

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      otpCode: "",
    },
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setError("otpCode", {
        type: "manual",
        message:
          "인증번호의 유효기간이 지나서 잘못되었습니다. 다시 요청해주세요.",
      });
    }
  }, [timeLeft, setError]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExtendTime = () => {
    setTimeLeft(180);
    clearErrors("otpCode");
  };

  // 인증번호 다시 요청하기
  const handleResendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setTimeLeft(180);
    reset({ otpCode: "" });
  };

  // 성공 제출 시, 단 1회 전역 스토어 반영 후 다음 스텝 이동
  const onSubmit = (data: OtpFormData) => {
    if (timeLeft === 0) {
      setError("otpCode", {
        type: "manual",
        message:
          "인증번호의 유효기간이 지나서 잘못되었습니다. 다시 요청해주세요.",
      });
      return;
    }

    if (data.otpCode !== generatedOtp) {
      setError("otpCode", {
        type: "manual",
        message: "인증번호가 일치하지 않습니다. 다시 확인해 주세요.",
      });
      return;
    }

    store.setSmsCode(data.otpCode);
    store.setSmsVerified(true);
    onNext();
  };

  return (
    <div className={styles.phoneContentLayout}>
      {/* 영구 토스트 메시지 컴포넌트 마운트 */}
      <OtpToastMessage otp={generatedOtp} />

      <Flex direction="column" width="full">
        {/* 헤더 */}
        <div style={{ marginBottom: "32px" }}>
          <Text as="h2" className={styles.phoneTitle}>
            문자로 받은
            <br />
            인증번호 6자리를 입력해주세요
          </Text>
        </div>

        {/* 폼 입력 영역 */}
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap="1rem"
          width="full"
          className={styles.formContainer}
        >
          <div className={styles.inputGroup}>
            <div
              className={clsx(
                styles.inputWrapper,
                errors.otpCode && styles.inputWrapperError,
              )}
            >
              <Controller
                name="otpCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    maxLength={6}
                    placeholder="인증번호 입력"
                    className={styles.inputField}
                    onChange={(e) => {
                      const onlyNums = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      field.onChange(onlyNums);
                    }}
                  />
                )}
              />
              {/* 타이머 및 시간 연장 */}
              <div className={styles.timerWrapper}>
                <span className={styles.timerText}>{formatTime(timeLeft)}</span>
                <button
                  type="button"
                  onClick={handleExtendTime}
                  className={styles.extendButton}
                >
                  시간 연장
                </button>
              </div>
            </div>
            {errors.otpCode && (
              <span className={styles.errorText}>{errors.otpCode.message}</span>
            )}
          </div>

          {/* 재전송 링크 */}
          <div className={styles.resendContainer}>
            <button
              type="button"
              onClick={handleResendOtp}
              className={styles.resendButton}
            >
              인증번호 다시 요청하기
              <FaAngleRight />
            </button>
          </div>

          {/* 하단 인증하기 버튼 */}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              disabled={!isValid}
              className={clsx(
                styles.submitButton,
                isValid
                  ? styles.submitButtonActive
                  : styles.submitButtonDisabled,
              )}
            >
              인증하기
            </button>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
