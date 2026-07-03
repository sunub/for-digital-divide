import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useState } from "react";
import { Pin } from "@/components/Pin";
import { NumpadProvider } from "@/context/NumpadContext";
import type { KeypadInfo } from "@/entities/keypad/keypad.model";
import { Device } from "@/shared/layout";
import { useDevice } from "@/shared/layout/ui/DeviceContext";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { executeTransferAction } from "../utils/executeTransferAction";
import { verifyTransferPinAction } from "../utils/verifyTransferPinAction";
import * as styles from "./ConfirmPinStep.css";

interface ConfirmPinStepProps {
  onNext: () => void;
  padInfo: KeypadInfo;
}

export function ConfirmPinStep({ onNext, padInfo }: ConfirmPinStepProps) {
  const {
    sourceAccount,
    recipientAccountNumber,
    transferAmount,
    recipientName,
  } = useTransferStore();
  const { openDrawer, closeDrawer } = useDevice();

  const [isTransferring, setIsTransferring] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePinVerified = async () => {
    if (!sourceAccount) {
      setErrorMsg("출금 계좌 정보가 없습니다.");
      return;
    }
    if (!recipientAccountNumber) {
      setErrorMsg("입금 계좌 정보가 없습니다.");
      return;
    }

    setIsTransferring(true);
    setErrorMsg("");

    try {
      const result = await executeTransferAction(
        sourceAccount.accountNumber,
        recipientAccountNumber,
        Number(transferAmount),
      );

      if (result.success) {
        closeDrawer();
        onNext();
      } else {
        setErrorMsg(result.message || "이체 처리에 실패했습니다.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      setErrorMsg(message);
    } finally {
      setIsTransferring(false);
    }
  };

  return (
    <NumpadProvider>
      <Pin.registerForm
        action={verifyTransferPinAction}
        title={`${Number(transferAmount).toLocaleString()}원`}
        description={`${recipientName} 님에게 이체하려면 등록하신 4자리 핀 번호를 입력해 주세요.`}
        onSuccess={handlePinVerified}
        className={styles.pinForm}
        contentFooter={
          <Flex
            direction="column"
            gap={3}
            className={styles.transferActionFooter}
          >
            {errorMsg && (
              <Text
                as="p"
                variant="description"
                className={styles.transferErrorText}
              >
                {errorMsg}
              </Text>
            )}
            <Box width="full">
              <Button
                type="button"
                onClick={openDrawer}
                variant="primary"
                size="wide"
                status={isTransferring ? "pending" : "idle"}
              >
                {recipientName} 님에게 이체
              </Button>
            </Box>
          </Flex>
        }
      >
        <Device.Drawer>
          <Pin.numpad padInfo={padInfo} />
        </Device.Drawer>
      </Pin.registerForm>
    </NumpadProvider>
  );
}
