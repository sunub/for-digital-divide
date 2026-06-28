"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  Button,
  Text,
} from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { useRef } from "react";
import { MdLock, MdToken } from "react-icons/md";
import { DemoNoticeDialog } from "./components/DemoNoticeDialog";
import { MethodOptionRow } from "./components/MethodOptionRow";
import * as styles from "./VerifySelectionStep.css";

interface StepProps {
  onNext: () => void;
}

export function VerifySelectionStep({ onNext }: StepProps) {
  const kbTriggerRef = useRef<HTMLButtonElement>(null);
  const wooriTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Flex direction="column" gap={4} width="full">
        <Flex direction="column" gap={2}>
          <Text
            as="h2"
            fontSize="1.5rem"
            fontWeight="bold"
            color="button"
            textAlign="left"
            marginTop={2}
          >
            본인확인방법을
            <br />
            선택해 주세요
          </Text>
        </Flex>

        <Flex direction="column" gap={3} width="full">
          <Grid gap={3}>
            <AlertDialog defaultOpen={false}>
              <AlertDialogTrigger asChild>
                <Button
                  ref={kbTriggerRef}
                  className={styles.certButton}
                  variant="transparent"
                  size={"wide"}
                >
                  <Flex alignItems="center" gap="1rem">
                    <MdLock size={20} />
                    <Text
                      as="span"
                      variant="body"
                      fontWeight="semibold"
                      color="text"
                    >
                      KB국민인증서
                    </Text>
                  </Flex>
                </Button>
              </AlertDialogTrigger>
              <DemoNoticeDialog title="KB국민인증서" />
            </AlertDialog>

            <AlertDialog defaultOpen={false}>
              <AlertDialogTrigger asChild>
                <Button
                  ref={wooriTriggerRef}
                  className={styles.certButton}
                  variant="transparent"
                  size={"wide"}
                >
                  <Flex alignItems="center" gap="1rem">
                    <MdToken size={20} />
                    <Text
                      as="span"
                      variant="body"
                      fontWeight="semibold"
                      color="text"
                    >
                      우리WON인증서
                    </Text>
                  </Flex>
                </Button>
              </AlertDialogTrigger>
              <DemoNoticeDialog title="우리WON인증서" />
            </AlertDialog>
          </Grid>

          <Text
            as="p"
            variant="description"
            color="descriptionText"
            marginTop={1}
            className={styles.description}
            size={"0.75rem"}
          >
            다른 은행 인증서가 없다면 먼저 발급받은 후 본인확인을 진행해 주세요.
          </Text>

          <Flex direction="column" gap={2} marginTop={2}>
            <MethodOptionRow title="휴대폰인증" onClick={onNext} />
          </Flex>
        </Flex>
      </Flex>

      <Text
        as="p"
        variant="description"
        color="descriptionText"
        marginTop="auto"
        paddingBottom={4}
        size={"0.75rem"}
      >
        본인명의 휴대폰이 없거나 신분증이 없는 경우 [다른 방법으로 본인확인]을
        선택해주세요.
      </Text>
    </>
  );
}
