"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useRef } from "react";
import { AlertCloseButton } from "@/app/dashboard/ui/Alert/AlertCloseButton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/AlertDialog";

interface StepProps {
  onNext: () => void;
}

export default function VerifySelectionStep({ onNext }: StepProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Flex direction="column" gap="1rem" width="full">
      <Text
        as="h2"
        variant="title"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        본인인증 방식 선택
      </Text>

      <AlertDialog defaultOpen={false}>
        <AlertDialogTrigger
          ref={triggerRef}
          style={{
            width: "100%",
            padding: "16px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.25rem",
            backgroundColor: "var(--color-surface-variant, #f5f5f5)",
            border: "1px solid var(--color-border, #ddd)",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <strong
            style={{ fontSize: "1.1rem", color: "var(--color-text, #000)" }}
          >
            국민인증서
          </strong>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: "normal",
              opacity: 0.8,
              color: "var(--color-text, #000)",
            }}
          >
            KB인증서로 간편 본인확인 (안내)
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Flex
            direction="column"
            alignItems="center"
            gap="1.5rem"
            style={{ padding: "1.5rem" }}
          >
            <Text
              as="h3"
              variant="title"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              국민인증서 안내
            </Text>
            <Text
              as="p"
              variant="body"
              style={{ textAlign: "center", lineHeight: "1.5" }}
            >
              현재 데모 버전에서는 <strong>휴대폰 인증</strong>을 이용해 주시기
              바랍니다.
              <br />
              확인 버튼을 누르신 후, 아래의 <strong>휴대폰 본인 인증</strong>{" "}
              버튼을 클릭해 주세요.
            </Text>
            <AlertCloseButton />
          </Flex>
        </AlertDialogContent>
      </AlertDialog>

      <Button onClick={onNext} style={{ width: "100%", padding: "12px 0" }}>
        휴대폰 본인 인증 진행하기
      </Button>
    </Flex>
  );
}
