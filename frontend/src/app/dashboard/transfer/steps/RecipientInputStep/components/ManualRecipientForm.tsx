import { Button, Text, TextField } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import type { ChangeEvent } from "react";
import * as styles from "../RecipientInputStep.css";
import { DeviceDrawer } from "@/shared/layout";

interface ManualRecipientFormProps {
  accountNumber: string;
  selectedBank: string;
  onAccountNumberChange: (value: string) => void;
  onOpenBankSelection: () => void;
  onSubmit: () => void;
  onCloseBankSelection: () => void;
}

export function ManualRecipientForm({
  selectedBank,
  accountNumber,
  onAccountNumberChange,
  onOpenBankSelection,
  onSubmit,
  onCloseBankSelection,
}: ManualRecipientFormProps) {
  const canSubmit = selectedBank.length > 0 && accountNumber.length > 0;

  const handleAccountNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    onAccountNumberChange(event.target.value.replace(/\D/g, ""));
  };

  return (
    <Flex direction="column" gap={4} marginTop={4} style={{ flex: 1 }}>
      <Text as="h3" variant="bodyStrong">
        직접 입력
      </Text>

      <TextField
        type="text"
        inputMode="numeric"
        labelContent="계좌번호"
        placeholder="-없이 계좌번호 입력"
        value={accountNumber}
        onChange={handleAccountNumberChange}
      />
      <Button
        variant="default"
        onClick={onOpenBankSelection}
        className={styles.bankSelectButton}
      >
        {selectedBank || "은행 또는 증권사 선택"}
      </Button>
      <DeviceDrawer>
        <h1>HI</h1>
      </DeviceDrawer>

      <Box marginTop="auto" width="full">
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={styles.fullWidthButton}
        >
          확인
        </Button>
      </Box>
    </Flex>
  );
}
