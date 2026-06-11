"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";

interface StepProps {
  onNext: () => void;
}

export default function IntroStep({ onNext }: StepProps) {
  return (
    <Flex direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>간편 온보딩 시작</Text>
      <Text as="p" variant="body" style={{ color: "var(--color-text-description)" }}>서비스 이용을 위해 온보딩 단계를 진행합니다.</Text>
      <Button onClick={onNext} style={{ width: "100%" }}>시작하기</Button>
    </Flex>
  );
}
