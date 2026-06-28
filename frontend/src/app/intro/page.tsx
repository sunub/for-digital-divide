"use client";

import { Button, Text } from "@internal/design-system/components";
import { Box, Flex, Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style/Grid.css";

import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import {
  MdAccountBalance,
  MdArrowForwardIos,
  MdBadge,
  MdDevices,
  MdLockPerson,
  MdSecurity,
  MdVerified,
  MdVerifiedUser,
  MdWorkspacePremium,
} from "react-icons/md";
import { useHistory } from "@/shared/hooks/useHistory";
import { Device } from "@/shared/layout";
import * as styles from "./page.css";

const IntroGuide = memo(function IntroGuide() {
  return (
    <Flex
      direction="column"
      gap={6}
      p={6}
      className={styles.guidePanelContainer}
    >
      <Flex
        alignItems="center"
        gap={2}
        px={4}
        py={2}
        className={styles.guideBadge}
      >
        <MdVerifiedUser size={18} />
        <span>모바일 뱅킹 인증센터</span>
      </Flex>
      <Text as="h1" className={styles.guideTitle}>
        안전한 금융 거래를 위한
        <br />
        <span className={styles.guideTitleHighlight}>인증서 발급 안내</span>
      </Text>

      <Grid gap={4} className={styles.guideInfoGrid}>
        <Flex
          direction="column"
          alignItems="flex-start"
          gap={3}
          p={4}
          className={styles.guideInfoBox}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            p={2}
            className={styles.guideInfoIconContainer}
          >
            <MdAccountBalance size={24} />
          </Flex>
          <Box>
            <Text as="h3" className={styles.guideInfoTitle}>
              왜 인증서가 필요한가요?
            </Text>
            <Text as="p" className={styles.guideInfoDescription}>
              본인 확인 및 전자 서명을 통해 타인으로부터의 도용을 방지하고, 송금
              및 상품 가입 시 법적 효력을 갖는 안전한 금융 거래를 보장하기 위해
              반드시 필요합니다.
            </Text>
          </Box>
        </Flex>
      </Grid>

      <Flex direction="column" gap={3} className={styles.guideSectionContainer}>
        <Flex
          alignItems="center"
          gap={2}
          as="h3"
          className={styles.guideSectionTitle}
        >
          <MdVerifiedUser size={20} style={{ color: "var(--color-button)" }} />
          발급 후 진행 단계
        </Flex>
        <Box as="ul" className={styles.guideStepList}>
          <Flex
            as="li"
            alignItems="flex-start"
            gap={2}
            className={styles.guideStepItem}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              className={styles.guideStepNumber}
            >
              1
            </Flex>
            <span>
              <strong>계좌 연결 및 본인확인:</strong> 보유하신 계좌 정보를 통해
              실명 인증을 완료합니다.
            </span>
          </Flex>
          <Flex
            as="li"
            alignItems="flex-start"
            gap={2}
            className={styles.guideStepItem}
            marginTop={2}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              className={styles.guideStepNumber}
            >
              2
            </Flex>
            <span>
              <strong>이체 한도 설정:</strong> 사용 용도에 맞춰 1일/1회 이체
              한도를 지정합니다.
            </span>
          </Flex>
          <Flex
            as="li"
            alignItems="flex-start"
            gap={2}
            className={styles.guideStepItem}
            marginTop={2}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              className={styles.guideStepNumber}
            >
              3
            </Flex>
            <span>
              <strong>서비스 이용 시작:</strong> 간편 송금, 상품 가입 등 모든
              기능을 이용할 수 있습니다.
            </span>
          </Flex>
        </Box>
      </Flex>

      <Flex
        alignItems="center"
        gap={2}
        paddingLeft={2}
        style={{ marginTop: "1rem" }}
      >
        <MdSecurity
          size={18}
          style={{ color: "var(--color-descriptionText)" }}
        />
        <Text as="span" variant="description" color="descriptionText">
          본 인증 시스템은 금융보안 가이드라인을 준수합니다.
        </Text>
      </Flex>
    </Flex>
  );
});

export default function IntroPage() {
  const { add } = useHistory();
  const router = useRouter();

  const handleStart = useCallback(() => {
    add(window.location.href);
    router.push("/onboarding");
  }, [add, router]);

  const handleCancel = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Grid className={gridLayout} style={{ overflowX: "hidden" }}>
      <IntroGuide />

      <Grid placeItems={"center"} width={"full"} height={"fit"}>
        <Device.Frame>
          <Device.Content>
            <Flex
              direction="column"
              justifyContent="space-between"
              p={6}
              paddingTop={12}
              gap={6}
              height="full"
              className={styles.phoneContentLayout}
            >
              <Box>
                <Text as="h2" className={styles.phoneTitle}>
                  금융 인증서
                  <br />
                  발급하기
                </Text>
                <Text as="p" className={styles.phoneSubtitle}>
                  30초면 충분합니다. 빠르고 안전하게 발급받으세요.
                </Text>
              </Box>

              <Flex direction="column" alignItems="center" width="full">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  className={styles.pulseCircle}
                >
                  <Box className={styles.dashedBorder} />
                  <MdWorkspacePremium
                    size={64}
                    style={{ color: "var(--color-button)" }}
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  gap={1.5}
                  px={3}
                  py={1.5}
                  marginTop={4}
                  className={styles.secureBadge}
                >
                  <MdVerified
                    size={14}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.secureBadgeText}>Safe & Secure</span>
                </Flex>
              </Flex>

              {/* Feature List inside Phone */}
              <Flex direction="column" gap={2} width="full">
                <Flex
                  alignItems="center"
                  gap={3}
                  p={4}
                  className={styles.featureCard}
                >
                  <MdBadge size={20} style={{ color: "var(--color-button)" }} />
                  <span className={styles.featureText}>간편한 본인 확인</span>
                </Flex>
                <Flex
                  alignItems="center"
                  gap={3}
                  p={4}
                  className={styles.featureCard}
                >
                  <MdLockPerson
                    size={20}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.featureText}>
                    강력한 보안 알고리즘
                  </span>
                </Flex>
                <Flex
                  alignItems="center"
                  gap={3}
                  p={4}
                  className={styles.featureCard}
                >
                  <MdDevices
                    size={20}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.featureText}>
                    모든 기기 자유로운 사용
                  </span>
                </Flex>
              </Flex>

              <Flex direction="column" gap={3} width="full">
                <Button type="button" size="lg" onClick={handleStart}>
                  <span>인증서 발급하기</span>
                  <MdArrowForwardIos size={14} />
                </Button>
                <Button
                  type="button"
                  variant="transparent"
                  size="lg"
                  className={styles.secondaryButton}
                  onClick={handleCancel}
                >
                  나중에 발급할게요
                </Button>
              </Flex>
            </Flex>
          </Device.Content>
        </Device.Frame>
      </Grid>
    </Grid>
  );
}
