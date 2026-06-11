"use client";

import { Text, ThreeDButton } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { actionNextStepGlow } from "@internal/design-system/style";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import { AlertCloseButton } from "../../dashboard/ui/Alert/AlertCloseButton";
import * as styles from "./VerifyStep.css";

export function VerifyStep() {
  const kbCertTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.phoneContentLayout}>
      <Flex direction="column" width="full">
        <h2 className={styles.phoneTitle}>본인 확인</h2>
        <p className={styles.phoneSubtitle}>
          본인 인증을 위한 수단을 선택해 주세요.
        </p>

        <AlertDialog defaultOpen={false}>
          <div className={styles.methodButtons}>
            {/* 국민인증서 (안내 모달 트리거) */}
            <AlertDialogTrigger
              ref={kbCertTriggerRef}
              className={styles.kbButton}
            >
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="full"
              >
                <strong
                  style={{ fontSize: "1.1rem", color: "var(--color-text)" }}
                >
                  국민인증서
                </strong>
                <span className={styles.kbBadge}>안내전용</span>
              </Flex>
              <span className={styles.methodDesc}>
                국민은행 인증서로 본인 인증 (안내 팝업 제공)
              </span>
            </AlertDialogTrigger>

            {/* 휴대폰 인증 (실제 Next Step - Glow Highlight) */}
            <ThreeDButton
              as={Link}
              href="/login?step=selection"
              highlighting={true}
              className={clsx(actionNextStepGlow)}
              style={{
                width: "100%",
                textDecoration: "none",
              }}
            >
              <Flex
                direction="column"
                alignItems="flex-start"
                justifyContent="center"
                width="full"
                style={{ padding: "0.25rem 0" }}
              >
                <strong style={{ fontSize: "1.1rem" }}>휴대폰 인증</strong>
                <span
                  style={{
                    fontSize: "0.8rem",
                    opacity: 0.8,
                    fontWeight: "normal",
                    marginTop: "0.25rem",
                  }}
                >
                  휴대폰 SMS 인증을 통해 본인 확인 진행
                </span>
              </Flex>
            </ThreeDButton>
          </div>

          {/* 국민인증서 클릭 시 표시될 모달 */}
          <AlertDialogContent>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
              style={{ padding: "1rem" }}
            >
              <Text
                as="h2"
                variant="title"
                style={{ fontSize: "1.3rem", fontWeight: "bold" }}
              >
                국민인증서 안내
              </Text>
              <Text
                as="p"
                variant="body"
                color="descriptionText"
                style={{
                  textAlign: "center",
                  lineHeight: "1.5",
                  fontSize: "0.9rem",
                }}
              >
                현재 데모 프로젝트에서는 <strong>휴대폰 인증서</strong>를 통한
                본인 확인 방법을 안내하고 있습니다.
                <br />
                <br />
                확인 버튼을 누르신 후, 화면에서 반짝이고 있는{" "}
                <strong>휴대폰 인증</strong> 버튼을 클릭하여 본인 확인 단계를
                계속해 주세요!
              </Text>
              <Flex width="full" style={{ marginTop: "1rem" }}>
                <AlertCloseButton />
              </Flex>
            </Flex>
          </AlertDialogContent>
        </AlertDialog>
      </Flex>

      <span className={styles.infoText}>
        본인확인 정보는 암호화되어 전송됩니다.
      </span>
    </div>
  );
}
