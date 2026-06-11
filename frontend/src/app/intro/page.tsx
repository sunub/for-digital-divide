"use client";

import { Flex, Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style/Grid.css";
import { Button, Text } from "@internal/design-system/components";
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
import { Instruction } from "@/components/Instruction";
import { useHistory } from "@/shared/hooks/useHistory";
import { Device } from "@/shared/layout";
import * as styles from "./page.css";
import clsx from "clsx";
import { actionNextStepGlow } from "@internal/design-system/style";

const InformationGuide = memo(function InformationGuide() {
  return (
    <>
      <Instruction.Badge
        icon={
          <MdVerifiedUser size={18} style={{ color: "var(--color-button)" }} />
        }
      >
        모바일 뱅킹 인증센터
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        안전한 금융 거래를 위한
        <br />
        인증서 발급 안내
      </Instruction.Title>

      <Instruction.InfoBox
        title={"왜 인증서가 필요한가요?"}
        icon={
          <MdAccountBalance
            size={24}
            style={{ color: "var(--color-button)" }}
          />
        }
      >
        <Text as="p" variant="body" color={"text"}>
          본인 확인 및 전자 서명을 통해 타인으로부터의 도용을 방지하고, 송금 및
          상품 가입 시 법적 효력을 갖는 안전한 금융 거래를 보장하기 위해 반드시
          필요합니다.
        </Text>
      </Instruction.InfoBox>
    </>
  );
});

const StepGuide = memo(function StepGuide() {
  return (
    <Instruction.Box>
      <Instruction.Title
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <MdVerifiedUser size={20} style={{ color: "var(--color-button)" }} />
        발급 후 진행 단계
      </Instruction.Title>
      <Instruction.List activeStep={1}>
        <Instruction.Item step={1}>
          <strong>계좌 연결 및 본인확인:</strong> 보유하신 계좌 정보를 통해 실명
          인증을 완료합니다.
        </Instruction.Item>
        <Instruction.Item step={2}>
          <strong>이체 한도 설정:</strong> 사용 용도에 맞춰 1일/1회 이체 한도를
          지정합니다.
        </Instruction.Item>
        <Instruction.Item step={3}>
          <strong>서비스 이용 시작:</strong> 간편 송금, 상품 가입 등 모든 기능을
          이용할 수 있습니다.
        </Instruction.Item>
      </Instruction.List>

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
    </Instruction.Box>
  );
});

export default function IntroPage() {
  const { add } = useHistory();
  const router = useRouter();

  const handleStart = useCallback(() => {
    add(window.location.href);
    router.push("/login");
  }, [add, router]);

  const handleCancel = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Grid className={gridLayout} style={{ overflowX: "hidden" }}>
      <Instruction.Panel>
        <InformationGuide />
        <StepGuide />
      </Instruction.Panel>

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
                  className={clsx(styles.primaryButton, actionNextStepGlow)}
                  onClick={handleStart}
                >
                  <span>인증서 발급하기</span>
                  <MdArrowForwardIos size={14} />
                </Button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleCancel}
                >
                  나중에 발급할게요
                </button>
              </div>
            </div>
          </Device.Content>
        </Device.Frame>
      </Grid>
    </Grid>
  );
}
