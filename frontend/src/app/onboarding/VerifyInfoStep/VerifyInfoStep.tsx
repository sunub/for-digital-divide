"use client";

import { Button } from "@internal/design-system/components";
import { Flex, Box } from "@internal/design-system/primitives";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { zodResolver } from "../utils/zodResolver";
import { CarrierField } from "./CarrierField";
import {
  getVerifyErrorMessage,
  isCarrierValue,
  VERIFY_INFO_ERROR_IDS,
  type VerifyFormData,
  verifySchema,
} from "./form";
import { NameField } from "./NameField";
import { PhoneField } from "./PhoneField";
import { ResidentNumberField } from "./ResidentNumberField";
import * as styles from "./VerifyInfoStep.css";
import { VerifyInfoStepHeader } from "./VerifyInfoStepHeader";

interface VerifyInfoStepProps {
  onNext: () => void;
}

export default function VerifyInfoStep({ onNext }: VerifyInfoStepProps) {
  const residentBackRef = useRef<HTMLInputElement | null>(null);
  const store = useOnboardingStore(
    useShallow((store) => ({
      verifyName: store.verifyName,
      verifyPhoneNumber: store.verifyPhoneNumber,
      verifyCarrier: store.verifyCarrier,
      verifyResidentNumber: store.verifyResidentNumber,
      setVerifyInfoSubmitted: store.setVerifyInfoSubmitted,
      setVerifyInfo: store.setVerifyInfo,
    })),
  );

  const defaultResident = store.verifyResidentNumber || "900101-1234567";
  const [initialFront, initialBackPart] = defaultResident.split("-");
  const initialBack = initialBackPart ? initialBackPart.charAt(0) : "1";
  const defaultCarrier = isCarrierValue(store.verifyCarrier)
    ? store.verifyCarrier
    : "SKT";

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    mode: "onChange",
    defaultValues: {
      name: store.verifyName || "홍길동",
      residentFront: initialFront || "900101",
      residentBack: initialBack || "1",
      carrier: defaultCarrier,
      phone: store.verifyPhoneNumber || "010-1234-5678",
    },
  });

  const hasNameError = Boolean(errors.name && touchedFields.name);
  const nameErrorMessage = hasNameError
    ? getVerifyErrorMessage(errors.name?.message)
    : undefined;

  const residentFrontErrorMessage =
    errors.residentFront && touchedFields.residentFront
      ? getVerifyErrorMessage(errors.residentFront.message)
      : undefined;
  const residentBackErrorMessage =
    !residentFrontErrorMessage &&
    errors.residentBack &&
    touchedFields.residentBack
      ? getVerifyErrorMessage(errors.residentBack.message)
      : undefined;
  const residentErrorMessage =
    residentFrontErrorMessage || residentBackErrorMessage;
  const residentErrorId = residentFrontErrorMessage
    ? VERIFY_INFO_ERROR_IDS.residentFront
    : residentBackErrorMessage
      ? VERIFY_INFO_ERROR_IDS.residentBack
      : undefined;

  const hasCarrierError = Boolean(errors.carrier && touchedFields.carrier);
  const carrierErrorMessage = hasCarrierError
    ? getVerifyErrorMessage(errors.carrier?.message)
    : undefined;

  const hasPhoneError = Boolean(errors.phone && touchedFields.phone);
  const phoneErrorMessage = hasPhoneError
    ? getVerifyErrorMessage(errors.phone?.message)
    : undefined;

  const onSubmit = (data: VerifyFormData) => {
    store.setVerifyInfo({
      verifyName: data.name,
      verifyResidentNumber: `${data.residentFront}-${data.residentBack}000000`,
      verifyCarrier: data.carrier,
      verifyPhoneNumber: data.phone,
    });
    store.setVerifyInfoSubmitted(true);
    onNext();
  };

  return (
    <Flex direction="column" p={6} height="full" width="full">
      <Flex direction="column" width="full" height="full">
        <VerifyInfoStepHeader />
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap={4}
          width="full"
          style={{ flex: 1 }}
        >
          <NameField
            control={control}
            hasError={hasNameError}
            errorMessage={nameErrorMessage}
          />
          <ResidentNumberField
            control={control}
            residentBackRef={residentBackRef}
            hasError={Boolean(residentErrorMessage)}
            errorMessage={residentErrorMessage}
            errorId={residentErrorId}
          />
          <CarrierField
            control={control}
            hasError={hasCarrierError}
            errorMessage={carrierErrorMessage}
            errorId={VERIFY_INFO_ERROR_IDS.carrier}
          />
          <PhoneField
            control={control}
            hasError={hasPhoneError}
            errorMessage={phoneErrorMessage}
          />
          <Box marginTop="auto" paddingTop={6} width="full">
            <Button type="submit" disabled={!isValid} style={{ width: "100%" }}>
              본인 정보 입력 완료
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
