import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import {
  MOCK_ACCOUNTS,
  type RecipientAccountDTO,
} from "@/shared/mocks/accounts";
import * as styles from "../RecipientInputStep.css";

interface RecentRecipientListProps {
  onSelectRecipient: (account: RecipientAccountDTO) => void;
}

interface RecentRecipientButtonProps {
  account: RecipientAccountDTO;
  onSelectRecipient: (account: RecipientAccountDTO) => void;
}

export function RecentRecipientList({
  onSelectRecipient,
}: RecentRecipientListProps) {
  return (
    <Flex direction="column" gap={3}>
      <Text as="h3" variant="bodyStrong">
        내 계좌 및 최근 이체
      </Text>
      <Box as="ul" className={styles.accountList}>
        {MOCK_ACCOUNTS.map((account) => (
          <li key={account.account_number}>
            <RecentRecipientButton
              account={account}
              onSelectRecipient={onSelectRecipient}
            />
          </li>
        ))}
      </Box>
    </Flex>
  );
}

function RecentRecipientButton({
  account,
  onSelectRecipient,
}: RecentRecipientButtonProps) {
  const handleClick = () => {
    onSelectRecipient(account);
  };

  return (
    <Button
      variant="transparent"
      className={styles.accountButton}
      onClick={handleClick}
      aria-label={`${account.user.name} 님의 ${account.bank} ${account.account_number} 계좌로 이체하기`}
    >
      <Flex direction="column" alignItems="flex-start" gap={1}>
        <Text as="span" variant="bodyStrong">
          {account.user.name}
        </Text>
        <Text as="span" variant="body" color="mutedForeground">
          {account.bank} {account.account_number}
        </Text>
      </Flex>
    </Button>
  );
}
