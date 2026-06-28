"use client";

import { Button } from "@internal/design-system/components";
import { Flex, Box } from "@internal/design-system/primitives";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleRight } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";
import { useInterval } from "@/shared/hooks/useInterval";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { OtpToastMessage } from "../ui/ToastMessage";
import { zodResolver } from "../utils/zodResolver";
import {
  generateOtpCode,
  OTP_ERROR_MESSAGES,
  OTP_TIME_LIMIT_SECONDS,
  type OtpFormData,
  otpSchema,
} from "./form";
import { OtpCodeField } from "./OtpCodeField";
import { VerifyOtpStepHeader } from "./VerifyOtpStepHeader";
import { resendButton, verifyButton } from "./VerifyOtpStep.css";

interface VerifyOtpStepProps {
  onNext: () => void;
}

export default function VerifyOtpStep({ onNext }: VerifyOtpStepProps) {
  const store = useOnboardingStore(
    useShallow((state) => ({
      setSmsCode: state.setSmsCode,
      setSmsVerified: state.setSmsVerified,
    })),
  );
  const [timeLeft, setTimeLeft] = useState<number>(OTP_TIME_LIMIT_SECONDS);
  const [generatedOtp, setGeneratedOtp] = useState<string>(generateOtpCode);

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

  useInterval(
    () => {
      if (timeLeft > 0) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }
    },
    timeLeft > 0 ? 1000 : null,
  );

  useEffect(() => {
    if (timeLeft === 0) {
      setError("otpCode", {
        type: "manual",
        message: OTP_ERROR_MESSAGES.expired,
      });
    }
  }, [timeLeft, setError]);

  const handleExtendTime = (): void => {
    setTimeLeft(OTP_TIME_LIMIT_SECONDS);
    clearErrors("otpCode");
  };

  const handleResendOtp = (): void => {
    setGeneratedOtp(generateOtpCode());
    setTimeLeft(OTP_TIME_LIMIT_SECONDS);
    clearErrors("otpCode");
    reset({ otpCode: "" });
  };

  const onSubmit = (data: OtpFormData): void => {
    if (timeLeft === 0) {
      setError("otpCode", {
        type: "manual",
        message: OTP_ERROR_MESSAGES.expired,
      });
      return;
    }

    if (data.otpCode !== generatedOtp) {
      setError("otpCode", {
        type: "manual",
        message: OTP_ERROR_MESSAGES.mismatch,
      });
      return;
    }

    store.setSmsCode(data.otpCode);
    store.setSmsVerified(true);
    onNext();
  };

  return (
    <Flex direction="column" height="full" width="full">
      <OtpToastMessage otp={generatedOtp} />

      <Flex direction="column" width="full" height="full">
        <VerifyOtpStepHeader />

        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap={4}
          width="full"
          style={{ flex: 1 }}
        >
          <OtpCodeField
            control={control}
            hasError={Boolean(errors.otpCode)}
            errorMessage={errors.otpCode?.message}
            timeLeft={timeLeft}
            onExtendTime={handleExtendTime}
          />

          <Flex justifyContent="flex-end" width="full">
            <Button
              type="button"
              variant="transparent"
              size="sm"
              onClick={handleResendOtp}
              className={resendButton}
            >
              인증번호 다시 요청하기
              <FaAngleRight aria-hidden />
            </Button>
          </Flex>

          <Box marginTop="auto" paddingTop={6} width="full">
            <Button
              type="submit"
              variant="primary"
              size="wide"
              disabled={!isValid || timeLeft === 0}
              className={verifyButton}
            >
              인증하기
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
