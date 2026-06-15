"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";

interface StepProps {
  onNext: () => void;
}

export default function TermsStep({ onNext }: StepProps) {
  const store = useOnboardingStore();

  const handleAgree = () => {
    store.setTermsAgreed(true);
    onNext();
  };

  return (
    <Flex direction="column" gap="1rem" width="full">
      <Text
        as="h2"
        variant="title"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        약관 동의
      </Text>
      <Text
        as="p"
        variant="body"
        style={{ color: "var(--color-text-description)" }}
      >
        서비스 이용을 위해 필수 및 선택 약관에 동의해 주세요.
      </Text>

      <Flex
        direction="column"
        gap="0.5rem"
        style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}
      >
        <Text as="p" style={{ fontSize: "0.95rem" }}>
          [필수] 개인정보 수집 및 이용 동의
        </Text>
        <Text as="p" style={{ fontSize: "0.95rem" }}>
          [필수] 고유식별정보 처리 동의
        </Text>
        <Text as="p" style={{ fontSize: "0.95rem" }}>
          [필수] 통신사 이용약관 동의
        </Text>
      </Flex>

      <Button
        onClick={handleAgree}
        style={{ width: "100%", marginTop: "1rem" }}
      >
        동의하고 계속하기
      </Button>
    </Flex>
  );
}
