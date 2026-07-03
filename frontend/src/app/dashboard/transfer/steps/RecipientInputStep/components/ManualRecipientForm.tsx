import { Button, Text, TextField } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FormValues } from "../RecipientInputStep";
import * as styles from "../RecipientInputStep.css";

interface ManualRecipientFormProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onOpenBankSelection: () => void;
  verifiedRecipientName: string;
  isSubmitting: boolean;
}

export function ManualRecipientForm({
  control,
  errors,
  onOpenBankSelection,
  verifiedRecipientName,
  isSubmitting,
}: ManualRecipientFormProps) {
  return (
    <Flex direction="column" gap={4} marginTop={4} style={{ flex: 1 }}>
      <Text as="h3" variant="bodyStrong">
        직접 입력
      </Text>

      <Controller
        name="accountNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className={styles.accountNumber}
            type="text"
            inputMode="numeric"
            labelContent="계좌번호"
            placeholder="-없이 계좌번호 입력"
            isError={!!errors.accountNumber}
            errorMessage={errors.accountNumber?.message}
            onChange={(e) => {
              field.onChange(e.target.value.replace(/\D/g, ""));
            }}
          />
        )}
      />

      <Controller
        name="bank"
        control={control}
        render={({ field }) => (
          <Flex direction="column" gap={1}>
            <Button
              type="button"
              variant="transparent"
              onClick={onOpenBankSelection}
              className={styles.bankSelectButton}
            >
              {field.value || "은행 또는 증권사 선택"}
            </Button>
            {errors.bank?.message && (
              <span className={styles.bankErrorText}>
                {errors.bank.message}
              </span>
            )}
          </Flex>
        )}
      />

      {verifiedRecipientName && (
        <TextField
          type="text"
          labelContent="확인된 예금주"
          value={verifiedRecipientName}
          disabled
          readOnly
        />
      )}

      <Box marginTop="auto" width="full">
        <Button
          type="submit"
          variant="primary"
          status={isSubmitting ? "pending" : "idle"}
          className={styles.fullWidthButton}
        >
          {verifiedRecipientName ? "다음" : "확인"}
        </Button>
      </Box>
    </Flex>
  );
}
