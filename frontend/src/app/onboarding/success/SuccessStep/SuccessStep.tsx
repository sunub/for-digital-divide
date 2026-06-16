"use client";

import { Button, Text } from "@internal/design-system/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { SuccessIcon } from "./SuccessIcon";
import * as styles from "./SuccessStep.css";

export default function SuccessStep() {
  const router = useRouter();
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  useEffect(() => {
    // 본인 인증이 완료되어 성공 페이지에 도달했으므로,
    // 뒤로가기를 통한 오동작을 방지하기 위해 스토어를 초기화합니다.
    resetOnboarding();
  }, [resetOnboarding]);

  return (
    <div className={styles.container}>
      <SuccessIcon />

      <div className={styles.textContainer}>
        <Text as="h2" variant="title" className={styles.titleText}>
          계좌 검증 완료
        </Text>
        <Text as="p" variant="body" className={styles.descriptionText}>
          온보딩 검증이 완료되었습니다.
          <br />
          마지막 단계인 간편 PIN 번호를 등록해 주세요.
        </Text>
      </div>

      <Button
        onClick={() => router.replace("/register-pin")}
        className={styles.button}
      >
        간편 PIN 비밀번호 등록
      </Button>
    </div>
  );
}
