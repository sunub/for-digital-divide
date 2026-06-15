"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";

interface StepProps {
  onNext: () => void;
}

export default function SuccessStep({ onNext }: StepProps) {
  return (
    <Flex
      direction="column"
      gap="1.5rem"
      width="full"
      alignItems="center"
      justifyContent="center"
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "var(--color-button, #ffcc00)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(255, 204, 0, 0.4)",
        }}
      >
        <span style={{ fontSize: "2rem", color: "#fff", fontWeight: "bold" }}>
          ✓
        </span>
      </div>

      <Flex direction="column" gap="0.5rem" alignItems="center">
        <Text
          as="h2"
          variant="title"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          계좌 검증 완료
        </Text>
        <Text
          as="p"
          variant="body"
          style={{
            color: "var(--color-text-description)",
            textAlign: "center",
            lineHeight: "1.4",
          }}
        >
          온보딩 검증이 완료되었습니다.
          <br />
          마지막 단계인 간편 PIN 번호를 등록해 주세요.
        </Text>
      </Flex>

      <Button onClick={onNext} style={{ width: "100%", marginTop: "1rem" }}>
        간편 PIN 비밀번호 등록
      </Button>
    </Flex>
  );
}
