"use client";

import { Text, ThreeDButton } from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style/Grid.css";
import Link from "next/link";
import { memo, useCallback } from "react";
import { MdInfoOutline, MdListAlt, MdWavingHand } from "react-icons/md";
import useToggle from "@/shared/hooks/use-toggle";
import { useHistory } from "@/shared/hooks/useHistory";
import { SmallPhone } from "./intro/ui/SmallPhone";
import * as guideStyles from "./onboarding/OnboardingGuide/PhoneVerificationGuide.css";

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
    <Flex
      justifyContent={"center"}
      width={"full"}
      style={{ marginTop: "2rem" }}
    >
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

const InitGuide = memo(function InitGuide({ handleHover }: StartButtonProps) {
  return (
    <Flex direction="column" className={guideStyles.panelContainer}>
      <div className={guideStyles.badge}>
        <MdWavingHand size={18} />
        <span>안녕하세요!</span>
      </div>

      <h1 className={guideStyles.title}>
        PC에서 쉽게 배우는
        <br />
        <span className={guideStyles.titleHighlight}>모바일 금융 서비스</span>
      </h1>

      <p className={guideStyles.description}>
        스마트폰 뱅킹이 아직 낯설고 어려우신가요? 가장 큰 진입 장벽인 '처음
        시작하는 순간'을 함께 넘을 수 있도록 도와드립니다.
      </p>

      <Grid className={guideStyles.infoGrid}>
        <Flex direction="column" className={guideStyles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={guideStyles.infoIconContainer}
          >
            <MdInfoOutline size={24} />
          </Flex>
          <div>
            <h3 className={guideStyles.infoTitle}>이 페이지는 무엇인가요?</h3>
            <p className={guideStyles.infoDescription}>
              PC의 넓은 화면에서 모바일 뱅킹의 본인인증과 인증서 등록 과정을
              자세하고 천천히 안내하여, 누구나 자신 있게 스마트폰 뱅킹을 시작할
              수 있도록 돕는 실습형 가이드입니다.
            </p>
          </div>
        </Flex>
      </Grid>

      <Flex direction="column" className={guideStyles.sectionContainer}>
        <h3 className={guideStyles.sectionTitle}>
          <MdListAlt size={20} style={{ color: "var(--color-button)" }} />
          서비스 이용 안내
        </h3>
        <Text
          as="p"
          variant="description"
          color={"descriptionText"}
          style={{ marginBottom: "1rem" }}
        >
          각 페이지에서 어떠한 동작을 수행해야 하는지를 아래의 정보와 같이
          안내해 드립니다.
        </Text>
        <ul className={guideStyles.stepList}>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>1</div>
            <span>좌측에 표시된 안내 정보와 이유를 자세하게 읽어 주세요.</span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>2</div>
            <span>
              화면에서 밝게 빛나는 부분이 여러분이 직접 클릭하거나 조작해야 할
              부분입니다. 마우스를 올려보세요!
            </span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>3</div>
            <span>
              모두 확인하셨다면 아래의 시작하기 버튼을 눌러 다음 단계로 이동해
              보세요.
            </span>
          </li>
        </ul>
      </Flex>

      <StartButton handleHover={handleHover} />
    </Flex>
  );
});

function InitPage() {
  const [isOpen, toggleOpen] = useToggle(false);

  const handleHover = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  return (
    <Grid className={gridLayout} style={{ overflowX: "hidden" }}>
      <InitGuide handleHover={handleHover} />
      <Grid placeItems={"center"} width={"full"} height={"fit"}>
        <SmallPhone isOpen={isOpen} />
      </Grid>
    </Grid>
  );
}

export default InitPage;
