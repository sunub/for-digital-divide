"use client";

import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { completeOnboardingAction } from "../utils/completeOnboardingAction";
import { zodResolver } from "../utils/zodResolver";
import { IdCardIllustration } from "./components/IdCardIllustration";
import { IssueDateField } from "./components/IssueDateField";
import { NameField } from "./components/NameField";
import { ResidentNumberField } from "./components/ResidentNumberField";
import {
  getIdCardErrorMessage,
  ID_CARD_ERROR_IDS,
  type IdCardFormData,
  idCardSchema,
} from "./form";

interface IdCardInfoStepProps {
  onNext: () => void;
}

export function IdCardInfoStep({ onNext }: IdCardInfoStepProps) {
  const residentBackRef = useRef<HTMLInputElement | null>(null);
  const store = useOnboardingStore(
    useShallow((store) => ({
      idCardResidentNumber: store.idCardResidentNumber,
      idCardName: store.idCardName,
      idCardIssueDate: store.idCardIssueDate,
      setIdCardDetails: store.setIdCardDetails,
      setIdCardVerified: store.setIdCardVerified,
    })),
  );

  const defaultResident = store.idCardResidentNumber || "900101-1234567";
  const [initialFront, initialBackPart] = defaultResident.split("-");
  const initialBack = initialBackPart ? initialBackPart.charAt(0) : "1";

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields, isSubmitting },
  } = useForm<IdCardFormData>({
    resolver: zodResolver(idCardSchema),
    mode: "onChange",
    defaultValues: {
      name: store.idCardName || "홍길동",
      residentFront: initialFront || "960116",
      residentBack: initialBack || "1",
      issueDate: store.idCardIssueDate || "2023.05.15",
    },
  });

  const nameVal = watch("name");
  const resFrontVal = watch("residentFront");
  const issueDateVal = watch("issueDate");

  const hasNameError = Boolean(errors.name && touchedFields.name);
  const nameErrorMessage = hasNameError
    ? getIdCardErrorMessage(errors.name?.message)
    : undefined;

  const residentFrontErrorMessage =
    errors.residentFront && touchedFields.residentFront
      ? getIdCardErrorMessage(errors.residentFront.message)
      : undefined;
  const residentBackErrorMessage =
    !residentFrontErrorMessage &&
    errors.residentBack &&
    touchedFields.residentBack
      ? getIdCardErrorMessage(errors.residentBack.message)
      : undefined;
  const residentErrorMessage =
    residentFrontErrorMessage || residentBackErrorMessage;
  const residentErrorId = residentFrontErrorMessage
    ? ID_CARD_ERROR_IDS.residentFront
    : residentBackErrorMessage
      ? ID_CARD_ERROR_IDS.residentBack
      : undefined;

  const hasIssueDateError = Boolean(
    errors.issueDate && touchedFields.issueDate,
  );
  const issueDateErrorMessage = hasIssueDateError
    ? getIdCardErrorMessage(errors.issueDate?.message)
    : undefined;

  const onSubmit = async (data: IdCardFormData) => {
    store.setIdCardDetails({
      idCardName: data.name,
      idCardResidentNumber: `${data.residentFront}-${data.residentBack}000000`,
      idCardIssueDate: data.issueDate,
    });
    store.setIdCardVerified(true);

    try {
      const response = await completeOnboardingAction({
        name: data.name,
      });
      if (response.status === "success") {
        onNext();
      } else {
        console.error("Onboarding completion failed:", response.payload);
      }
    } catch (err) {
      console.error("Onboarding completion error:", err);
    }
  };

  return (
    <Flex direction="column" padding={6} height="full" width="full">
      <Flex direction="column" width="full" height="full">
        <Box marginBottom={6}>
          <Text as="h2" variant="title">
            촬영된 신분증 정보를
            <br />
            <Box as="span" color="button">
              확인해 주세요
            </Box>
          </Text>
        </Box>

        <IdCardIllustration
          name={nameVal}
          residentFront={resFrontVal}
          issueDate={issueDateVal}
        />

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
          <IssueDateField
            control={control}
            hasError={hasIssueDateError}
            errorMessage={issueDateErrorMessage}
          />
          <Box marginTop="auto" paddingTop={6} width="full">
            <Button
              type="submit"
              status={isSubmitting ? "pending" : "idle"}
              disabled={!isValid}
              size={"wide"}
            >
              다음
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
