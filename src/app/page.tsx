"use client";

import {
  Backdrop,
  Box,
  PageGridSection,
  Stack,
  Surface,
  Text,
  ThreeDButton,
} from "@for-digital-divide/design-system";
import Link from "next/link";
import { useHistory } from "@/shared/hooks/useHistory";

function StartButton() {
  const { add } = useHistory();

  const handleStart = () => {
    add(window.location.href);
  };

  return (
    <ThreeDButton as={Link} onClick={handleStart} href={"/intro"}>
      시작하기
    </ThreeDButton>
  );
}

function InitPage() {
  return (
    <>
      <PageGridSection>
        <Surface elevation="raised" textAlign="center">
          <Stack space={8} alignItems="center">
            <Stack space={4} alignItems="center">
              <Text as="h1" variant="hero">
                안녕하세요!
              </Text>
              <Stack space={2} alignItems="center">
                <Text as="p" variant="body" color={"text"}>
                  이 홈페이지는 단순한 <Box as="strong">데모(가짜)</Box>{" "}
                  페이지입니다.
                </Text>
                <Text as="p" variant="body" color={"text"}>
                  시작하시려면 아래의 <Box as="strong">시작하기</Box>를
                  눌러주세요!
                </Text>
              </Stack>
            </Stack>
            <StartButton />
          </Stack>
        </Surface>
      </PageGridSection>
      <Backdrop />
    </>
  );
}

export default InitPage;
