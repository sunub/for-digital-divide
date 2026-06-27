import { Flex } from "@internal/design-system/primitives";
import { Text, Button } from "@internal/design-system/components";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { MOCK_ACCOUNTS, RecipientAccountDTO } from "@/shared/mocks/accounts";
import * as styles from "./RecipientSelectionStep.css";

export function RecipientSelectionStep({
  onNavigateToAmountInput,
  onDirectInput,
}: {
  onNavigateToAmountInput: () => void;
  onDirectInput: () => void;
}) {
  const setRecipientFromMock = useTransferStore(
    (state) => state.setRecipientFromMock,
  );

  const handleSelectAccount = (acc: RecipientAccountDTO) => {
    setRecipientFromMock(acc);
    onNavigateToAmountInput();
  };

  return (
    <Flex direction="column" width="full" gap={4}>
      <Text as="h2" variant="title">
        누구에게 보낼까요?
      </Text>

      <Button
        variant="transparent"
        onClick={onDirectInput}
        className={styles.directInputButton}
      >
        직접 입력
      </Button>

      <Flex direction="column" gap={3}>
        <Text as="h3" variant="bodyStrong">
          최근 보낸 계좌
        </Text>
        <ul className={styles.mockAccountList}>
          {MOCK_ACCOUNTS.map((acc) => (
            <li key={acc.account_number}>
              <Button
                variant="transparent"
                onClick={() => handleSelectAccount(acc)}
                className={styles.mockAccountItem}
                aria-label={`최근 보낸 계좌, ${acc.user.name} 님의 ${acc.bank} ${acc.account_number} 계좌로 이체하기`}
              >
                <Flex direction="column" gap={1} alignItems="flex-start">
                  <Flex width="full" justifyContent="space-between">
                    <Text variant="bodyStrong">{acc.user.name}</Text>
                  </Flex>
                  <Text variant="body" color="mutedForeground">
                    {acc.bank} {acc.account_number}
                  </Text>
                </Flex>
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </Flex>
  );
}
