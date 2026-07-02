"use client";

import { Button, Text } from "@internal/design-system/components";
import { Box, Flex, Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style/Grid.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  MdArrowForwardIos,
  MdBadge,
  MdDevices,
  MdLockPerson,
  MdVerified,
  MdWorkspacePremium,
} from "react-icons/md";
import { Device } from "@/shared/layout";
import * as styles from "./page.css";
import { IntroGuide } from "./ui/IntroGuide";

export default function IntroPage() {
  const router = useRouter();

  const handleCancel = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <Grid className={gridLayout}>
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
                <Button asChild size="lg">
                  <Link href={"/onboarding"}>
                    <span>인증서 발급하기</span>
                    <MdArrowForwardIos size={14} />
                  </Link>
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
