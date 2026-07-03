import {
  Button,
  Surface,
  Text,
  TextField,
} from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useQuery } from "@tanstack/react-query";
import { getAccountsData } from "@/app/dashboard/ui/Dashboard/utils/getAccountsData";
import { accountKeys } from "@/entities/accounts/accounts.query";
import { useTransferStore } from "@/store/transfer/transfer-store";
import * as styles from "./SummaryStep.css";

interface SummaryStepProps {
  onNext: () => void;
}

export function SummaryStep({ onNext }: SummaryStepProps) {
  const {
    sourceAccount,
    recipientName,
    recipientBank,
    recipientAccountNumber,
    transferAmount,
    memoToRecipient,
    memoToMe,
    setMemos,
  } = useTransferStore();

  const { data: accounts } = useQuery({
    queryKey: accountKeys.all(),
    queryFn: getAccountsData,
    staleTime: Infinity,
  });

  const activeAccount = accounts?.find(
    (acc) => acc.account_number === sourceAccount?.accountNumber,
  );
  const balance = activeAccount?.balance ?? 0;
  const formattedAmount = Number(transferAmount).toLocaleString();
  const formattedBalance = balance.toLocaleString();
  const accountDescription = `${recipientBank} ${recipientAccountNumber}`;

  return (
    <Flex
      direction="column"
      width="full"
      height="full"
      gap={6}
      padding={4}
      justifyContent="space-between"
    >
      <Box>
        <Text as="h2" variant="title" marginBottom={6}>
          최종 확인
        </Text>

        <Surface
          tone="canvas"
          elevation="none"
          borderRadius="md"
          padding={6}
          className={styles.summaryCard}
        >
          <Text as="p" variant="body" marginBottom={2}>
            <Text as="strong" variant="bodyStrong">
              {recipientName}
            </Text>
            님에게
          </Text>
          <Text as="p" variant="hero" marginBottom={4}>
            {formattedAmount}원
          </Text>
          <Text
            as="p"
            variant="description"
            color="descriptionText"
            className={styles.accountText}
          >
            {accountDescription}
          </Text>
          <Text
            as="p"
            variant="description"
            color="descriptionText"
            className={styles.balanceText}
          >
            출금 계좌 잔액: {formattedBalance} 원
          </Text>
        </Surface>
      </Box>

      <Flex direction="column" gap={4} className={styles.memoFields}>
        <TextField
          id="memo-to-recipient"
          type="text"
          value={memoToRecipient}
          onChange={(event) => setMemos(event.target.value, memoToMe)}
          labelContent="받는 분에게 표시"
          placeholder={recipientName}
        />

        <TextField
          id="memo-to-me"
          type="text"
          value={memoToMe}
          onChange={(event) => setMemos(memoToRecipient, event.target.value)}
          labelContent="나에게 표시"
          placeholder={recipientName}
        />
      </Flex>

      <Button type="button" onClick={onNext} variant="primary" size="wide">
        다음
      </Button>
    </Flex>
  );
}
