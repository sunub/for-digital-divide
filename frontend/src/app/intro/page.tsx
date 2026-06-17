"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { actionNextStepGlow } from "@internal/design-system/style";
import { gridLayout } from "@internal/design-system/style/Grid.css";
import clsx from "clsx";
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
import * as guideStyles from "../onboarding/OnboardingGuide/PhoneVerificationGuide.css";
import * as styles from "./page.css";

const IntroGuide = memo(function IntroGuide() {
  return (
    <Flex direction="column" className={guideStyles.panelContainer}>
      <div className={guideStyles.badge}>
        <MdVerifiedUser size={18} />
        <span>모바일 뱅킹 인증센터</span>
      </div>
      <h1 className={guideStyles.title}>
        안전한 금융 거래를 위한
        <br />
        <span className={guideStyles.titleHighlight}>인증서 발급 안내</span>
      </h1>

      <Grid className={guideStyles.infoGrid}>
        <Flex direction="column" className={guideStyles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={guideStyles.infoIconContainer}
          >
            <MdAccountBalance size={24} />
          </Flex>
          <div>
            <h3 className={guideStyles.infoTitle}>왜 인증서가 필요한가요?</h3>
            <p className={guideStyles.infoDescription}>
              본인 확인 및 전자 서명을 통해 타인으로부터의 도용을 방지하고, 송금
              및 상품 가입 시 법적 효력을 갖는 안전한 금융 거래를 보장하기 위해
              반드시 필요합니다.
            </p>
          </div>
        </Flex>
      </Grid>

      <Flex direction="column" className={guideStyles.sectionContainer}>
        <h3 className={guideStyles.sectionTitle}>
          <MdVerifiedUser size={20} style={{ color: "#9367ef" }} />
          발급 후 진행 단계
        </h3>
        <ul className={guideStyles.stepList}>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>1</div>
            <span>
              <strong>계좌 연결 및 본인확인:</strong> 보유하신 계좌 정보를 통해
              실명 인증을 완료합니다.
            </span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>2</div>
            <span>
              <strong>이체 한도 설정:</strong> 사용 용도에 맞춰 1일/1회 이체
              한도를 지정합니다.
            </span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>3</div>
            <span>
              <strong>서비스 이용 시작:</strong> 간편 송금, 상품 가입 등 모든
              기능을 이용할 수 있습니다.
            </span>
          </li>
        </ul>
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
            <div className={styles.phoneContentLayout}>
              <div>
                <h2 className={styles.phoneTitle}>
                  금융 인증서
                  <br />
                  발급하기
                </h2>
                <p className={styles.phoneSubtitle}>
                  30초면 충분합니다. 빠르고 안전하게 발급받으세요.
                </p>
              </div>

              <Flex direction="column" alignItems="center" width="full">
                <div className={styles.pulseCircle}>
                  <div className={styles.dashedBorder} />
                  <MdWorkspacePremium
                    size={64}
                    style={{ color: "var(--color-button)" }}
                  />
                </div>
                <div className={styles.secureBadge}>
                  <MdVerified
                    size={14}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.secureBadgeText}>Safe & Secure</span>
                </div>
              </Flex>

              {/* Feature List inside Phone */}
              <div className={styles.featureList}>
                <div className={styles.featureCard}>
                  <MdBadge size={20} style={{ color: "var(--color-button)" }} />
                  <span className={styles.featureText}>간편한 본인 확인</span>
                </div>
                <div className={styles.featureCard}>
                  <MdLockPerson
                    size={20}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.featureText}>
                    강력한 보안 알고리즘
                  </span>
                </div>
                <div className={styles.featureCard}>
                  <MdDevices
                    size={20}
                    style={{ color: "var(--color-button)" }}
                  />
                  <span className={styles.featureText}>
                    모든 기기 자유로운 사용
                  </span>
                </div>
              </div>

              <div className={styles.actionArea}>
                <Button
                  type="button"
                  size="lg"
                  className={clsx(styles.primaryButton, actionNextStepGlow)}
                  onClick={handleStart}
                >
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
              </div>
            </div>
          </Device.Content>
        </Device.Frame>
      </Grid>
    </Grid>
  );
}
