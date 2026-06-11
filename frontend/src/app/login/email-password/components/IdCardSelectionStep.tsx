"use client";

import { useRef } from "react";
import { Button, Text, ThreeDButton } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/AlertDialog";
import { AlertCloseButton } from "@/app/dashboard/ui/Alert/AlertCloseButton";

interface StepProps {
  onNext: () => void;
}

export default function IdCardSelectionStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const driverTriggerRef = useRef<HTMLButtonElement>(null);
  const passportTriggerRef = useRef<HTMLButtonElement>(null);

  const handleSelectResident = () => {
    store.setSelectedIdCardType("resident");
    onNext();
  };

  return (
    <Flex direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>신분증 인증 선택</Text>
      <Text as="p" variant="body" style={{ color: "var(--color-text-description)" }}>
        원하시는 신분증 인증 방식을 선택해 주세요. 주민등록증을 활용하시는 것을 권장합니다.
      </Text>

      {/* 주민등록증 인증 (실동작 권장 옵션) */}
      <ThreeDButton onClick={handleSelectResident} highlighting={true} style={{ width: "100%" }}>
        <Flex direction="column" alignItems="flex-start" gap="0.25rem">
          <strong style={{ fontSize: "1.1rem" }}>주민등록증 인증</strong>
          <span style={{ fontSize: "0.8rem", fontWeight: "normal", opacity: 0.8 }}>실물 주민등록증 정보 입력으로 검증</span>
        </Flex>
      </ThreeDButton>

      {/* 모바일 운전면허증 (안내용 모달) */}
      <AlertDialog defaultOpen={false}>
        <AlertDialogTrigger
          ref={driverTriggerRef}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--color-surface-variant, #f5f5f5)",
            border: "1px solid var(--color-border, #ddd)",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          모바일 운전면허 인증 (안내)
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Flex direction="column" alignItems="center" gap="1.5rem" style={{ padding: "1.5rem" }}>
            <Text as="h3" variant="title" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>모바일 운전면허 안내</Text>
            <Text as="p" variant="body" style={{ textAlign: "center", lineHeight: "1.5" }}>
              현재 시스템에서는 <strong>주민등록증 실물 인증</strong>만 바로 이용하실 수 있습니다.<br />
              취소 버튼을 누르고 <strong>주민등록증 인증</strong>으로 계속 진행해 주세요.
            </Text>
            <AlertCloseButton />
          </Flex>
        </AlertDialogContent>
      </AlertDialog>

      {/* 여권 인증 (안내용 모달) */}
      <AlertDialog defaultOpen={false}>
        <AlertDialogTrigger
          ref={passportTriggerRef}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--color-surface-variant, #f5f5f5)",
            border: "1px solid var(--color-border, #ddd)",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          여권 인증 (안내)
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Flex direction="column" alignItems="center" gap="1.5rem" style={{ padding: "1.5rem" }}>
            <Text as="h3" variant="title" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>여권 인증 안내</Text>
            <Text as="p" variant="body" style={{ textAlign: "center", lineHeight: "1.5" }}>
              여권 인증은 현재 준비 중입니다.<br />
              원활한 가입 진행을 위해 <strong>주민등록증 인증</strong>을 활용해 주시기 바랍니다.
            </Text>
            <AlertCloseButton />
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
