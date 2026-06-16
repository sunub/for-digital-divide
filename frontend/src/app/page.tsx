"use client";

import { Text, ThreeDButton } from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style/Grid.css";
import Link from "next/link";
import { memo, useCallback } from "react";
import { Instruction } from "@/components/Instruction";
import useToggle from "@/shared/hooks/use-toggle";
import { useHistory } from "@/shared/hooks/useHistory";
import { SmallPhone } from "./intro/ui/SmallPhone";

interface StartButtonProps {
  handleHover: () => void;
}

const StartButton = memo(function StartButton({
  handleHover,
}: StartButtonProps) {
  const { add } = useHistory();

  const handleStart = useCallback(() => {
    add(window.location.href);
  }, [add]);

  return (
    <Flex justifyContent={"center"} width={"full"}>
      <ThreeDButton
        as={Link}
        onClick={handleStart}
        onHoverStart={handleHover}
        onMouseLeave={handleHover}
        highlighting={true}
        href={"/intro"}
      >
        시작하기
      </ThreeDButton>
    </Flex>
  );
});

const ServiceGuide = memo(function ServiceGuide() {
  return (
    <Instruction.Box>
      <Text as="p" variant="description" color={"text"}>
        각 페이지에서 어떠한 동작을 수행해야 하는지를 아래의 정보와 같이 안내해
        드립니다.
      </Text>

      <Instruction.Title>서비스 이용 안내</Instruction.Title>
      <Instruction.List activeStep={2}>
        <Instruction.Item step={1}>
          박스에 표시된 정보들을 자세하게 읽어 주세요.
        </Instruction.Item>
        <Instruction.Item step={2}>
          밝게 빛나는 부분이 다음에 해야 할 행동입니다. 마우스를 올려보세요!
        </Instruction.Item>
        <Instruction.Item step={3}>
          이제 아래의 시작하기 버튼을 눌러 다음 단계로 이동해 보세요!
        </Instruction.Item>
      </Instruction.List>
    </Instruction.Box>
  );
});

const InformationGuide = memo(function InformationGuide() {
  return (
    <>
      <Instruction.Badge icon={"start"}>안녕하세요!</Instruction.Badge>
      <Instruction.InfoBox
        title={"PC에서 만나는 모바일 금융 서비스"}
        icon="info"
      >
        <Flex direction={"column"} gap={4}>
          <Text as="p" variant="body" color={"text"}>
            모바일 환경이 익숙하지 않으신 분들이 가장 어려워하는 것이 모바일
            뱅킹을 시작하는 순간입니다.
          </Text>
          <Text as="p" variant="body" color={"text"}>
            이 데모 페이지는 PC에서 모바일 뱅킹의 인증서 등록 과정을 자세하게
            안내하여, 누구나 쉽게 모바일 뱅킹을 시작할 수 있도록 돕기 위해
            만들어졌습니다.
          </Text>
        </Flex>
      </Instruction.InfoBox>
    </>
  );
});

function InitPage() {
  const [isOpen, toggleOpen] = useToggle(false);
  const { add } = useHistory();

  const handleHover = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  const _handleClick = useCallback(() => {
    if (isOpen) return;
    toggleOpen();
    add(new URL("/intro", window.location.href).toString());
  }, [isOpen, toggleOpen, add]);

  return (
    <Grid className={gridLayout} style={{ overflowX: "hidden" }}>
      <Instruction.Panel>
        <InformationGuide />
        <ServiceGuide />
        <StartButton handleHover={handleHover} />
      </Instruction.Panel>
      <Grid placeItems={"center"} width={"full"} height={"fit"}>
        <SmallPhone isOpen={isOpen} />
      </Grid>
    </Grid>
  );
}

export default InitPage;
