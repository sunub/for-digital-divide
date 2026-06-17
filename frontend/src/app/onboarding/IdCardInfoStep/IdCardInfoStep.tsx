"use client";

import { Button } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { completeOnboardingAction } from "../utils/completeOnboardingAction";
import { zodResolver } from "../utils/zodResolver";
import {
  getIdCardErrorMessage,
  ID_CARD_ERROR_IDS,
  type IdCardFormData,
  idCardSchema,
} from "./form";
import * as styles from "./IdCardInfoStep.css";
import { IssueDateField } from "./IssueDateField";
import { NameField } from "./NameField";
import { ResidentNumberField } from "./ResidentNumberField";

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
    formState: { errors, isValid, touchedFields },
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
    <div className={styles.phoneContentLayout}>
      <Flex direction="column" width="full">
        <h1 className={styles.phoneTitle} style={{ marginBottom: "24px" }}>
          촬영된 신분증 정보를
          <br />
          <span style={{ color: "#6c3ec6" }}>확인해 주세요</span>
        </h1>

        <div className={styles.illustrationCard}>
          <div className={styles.hologram1}></div>
          <div className={styles.hologram2}></div>

          <div className={styles.cardHeader}>
            <div className={styles.cardTitleGroup}>
              <span className={styles.cardCountry}>대한민국</span>
              <span className={styles.cardTitle}>주민등록증</span>
            </div>
            <div className={styles.cardPhoto}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(108, 62, 198, 0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>id-card-icon</title>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <div className={styles.cardInfo}>
            <div className={styles.cardNameText}>{nameVal || "이름"}</div>
            <div className={styles.cardRrnText}>
              {resFrontVal ? `${resFrontVal}-1******` : "주민등록번호"}
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardDateGroup}>
              <span className={styles.cardDateLabel}>발급일</span>
              <span className={styles.cardDateText}>
                {issueDateVal || "YYYY.MM.DD"}
              </span>
            </div>
            <div className={styles.cardSeal}>
              <div className={styles.cardSealInner}></div>
            </div>
          </div>
        </div>

        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap="1rem"
          width="full"
          className={styles.formContainer}
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
          <div className={styles.buttonContainer}>
            <Button type="submit" disabled={!isValid} style={{ width: "100%" }}>
              다음
            </Button>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
