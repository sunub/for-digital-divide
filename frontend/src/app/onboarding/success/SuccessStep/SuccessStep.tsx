"use client";

import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import Link from "next/link";
import { useEffect } from "react";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { SuccessIcon } from "./SuccessIcon";

export default function SuccessStep() {
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  useEffect(() => {
    // 본인 인증이 완료되어 성공 페이지에 도달했으므로,
    // 뒤로가기를 통한 오동작을 방지하기 위해 스토어를 초기화합니다.
    resetOnboarding();
  }, [resetOnboarding]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="full"
      gap={6}
      padding={"1rem"}
    >
      <SuccessIcon />

      <Flex direction="column" alignItems="center" gap={2}>
        <Text as="h2" variant="title" textAlign="center">
          계좌 검증 완료
        </Text>
        <Text as="p" variant="body" color="descriptionText" textAlign="center">
          온보딩 검증이 완료되었습니다.
          <br />
          마지막 단계인 간편 PIN 번호를 등록해 주세요.
        </Text>
      </Flex>

      <Box width="full" marginTop={4}>
        <Button asChild size={"wide"}>
          <Link href={"/register-pin"}>
            <Box>간편 PIN 비밀번호 등록</Box>
          </Link>
        </Button>
      </Box>
    </Flex>
  );
}
