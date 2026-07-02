import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import {
  MOCK_ACCOUNTS,
  type RecipientAccountDTO,
} from "@/shared/mocks/accounts";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { TransferHeader } from "../../components/TransferHeader";
import * as styles from "./RecipientSelectionStep.css";

const getBankAvatarVariant = (bankName: string) => {
  if (bankName.includes("하나")) return styles.avatarVariants.hana;
  if (bankName.includes("국민")) return styles.avatarVariants.kb;
  if (bankName.includes("기업")) return styles.avatarVariants.ibk;
  return styles.avatarVariants.default;
};

const getBankInitial = (bankName: string) => {
  if (bankName.includes("하나")) return "하";
  if (bankName.includes("국민")) return "국";
  if (bankName.includes("기업")) return "기";
  return bankName.charAt(0);
};

export function RecipientSelectionStep({
  onNavigateToAmountInput,
  onDirectInput,
}: {
  onNavigateToAmountInput: () => void;
  onDirectInput: () => void;
}) {
  const router = useRouter();
  const { resetTransfer, setRecipientFromMock } = useTransferStore();

  const handleSelectAccount = (acc: RecipientAccountDTO) => {
    setRecipientFromMock(acc);
    onNavigateToAmountInput();
  };

  const handleReturnToDashboard = () => {
    resetTransfer();
    router.replace("/dashboard");
  };

  return (
    <Flex direction="column" width="full" gap={6}>
      <TransferHeader
        onClick={handleReturnToDashboard}
        label="dashboard로 돌아가기"
      >
        누구에게 보낼까요?
      </TransferHeader>

      <Button
        variant="transparent"
        size="wide"
        onClick={onDirectInput}
        className={styles.directInputButton}
        aria-label="직접 계좌번호 입력하기"
      >
        <Text as="span" variant="body">
          직접 입력
        </Text>
        <MdChevronRight className={styles.chevronIcon} aria-hidden="true" />
      </Button>

      <Flex direction="column" gap={4}>
        <Box px={2}>
          <Text as="h3" variant="default" color="mutedForeground">
            최근 보낸 계좌
          </Text>
        </Box>
        <Box as="ul" className={styles.mockAccountList}>
          {MOCK_ACCOUNTS.map((acc) => (
            <li key={acc.account_number}>
              <Button
                variant="transparent"
                size="wide"
                onClick={() => handleSelectAccount(acc)}
                className={styles.mockAccountItem}
                aria-label={`최근 보낸 계좌, ${acc.user.name} 님의 ${acc.bank} ${acc.account_number} 계좌로 이체하기`}
              >
                <Flex
                  as="span"
                  size={12}
                  borderRadius="full"
                  alignItems="center"
                  justifyContent="center"
                  className={`${styles.avatarContainer} ${getBankAvatarVariant(acc.bank)}`}
                  aria-hidden="true"
                >
                  <Text as="span" variant="default">
                    {getBankInitial(acc.bank)}
                  </Text>
                </Flex>
                <Flex
                  direction="column"
                  gap={1}
                  className={styles.textLabelContainer}
                >
                  <Text as="span" variant="bodyStrong">
                    {acc.user.name}
                  </Text>
                  <Text as="span" variant="description" color="mutedForeground">
                    {acc.bank} {acc.account_number}
                  </Text>
                </Flex>
              </Button>
            </li>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}
