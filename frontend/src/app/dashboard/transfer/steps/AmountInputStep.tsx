import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useQuery } from "@tanstack/react-query";
import { getAccountsData } from "@/app/dashboard/ui/Dashboard/utils/getAccountsData";
import { accountKeys } from "@/entities/accounts/accounts.query";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { AmountNumpad } from "./AmountNumpad";

export function AmountInputStep({ onNext }: { onNext: () => void }) {
  const {
    recipientName,
    recipientBank,
    recipientAccountNumber,
    transferAmount,
    setAmount,
    sourceAccount,
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
  const isLimitExceeded = Number(transferAmount) > balance;

  const handleInput = (val: string) => {
    setAmount(transferAmount + val);
  };

  const handleDelete = () => {
    setAmount(transferAmount.slice(0, -1));
  };

  const displayAmount = transferAmount
    ? `${Number(transferAmount).toLocaleString()} 원`
    : "얼마를 보낼까요?";

  const isButtonDisabled =
    !transferAmount || Number(transferAmount) <= 0 || isLimitExceeded;

  return (
    <Flex
      direction="column"
      width="full"
      height="full"
      padding={4}
      justifyContent="space-between"
    >
      <Box textAlign="center" marginTop={8}>
        <Text
          as="p"
          variant="description"
          color="descriptionText"
          marginBottom={2}
        >
          {recipientBank} {recipientAccountNumber}
        </Text>
        <Text as="h2" variant="title">
          {recipientName} 님에게
        </Text>
        <Text
          as="div"
          variant="hero"
          marginTop={8}
          marginBottom={isLimitExceeded ? 2 : 8}
          color={
            isLimitExceeded
              ? "destructive"
              : transferAmount
                ? "text"
                : "mutedForeground"
          }
        >
          {displayAmount}
        </Text>
        {isLimitExceeded && (
          <Text
            as="p"
            variant="description"
            color="destructive"
            marginBottom={6}
          >
            잔액이 부족합니다. (최대 이체 가능 금액: {balance.toLocaleString()}{" "}
            원)
          </Text>
        )}
        <Text as="p" variant="description" color="descriptionText">
          내 계좌 잔액: {balance.toLocaleString()} 원
        </Text>
      </Box>

      <Flex direction="column" gap={4}>
        <AmountNumpad onInput={handleInput} onDelete={handleDelete} />
        <Button
          onClick={onNext}
          disabled={isButtonDisabled}
          variant="primary"
          size="wide"
        >
          완료
        </Button>
      </Flex>
    </Flex>
  );
}
