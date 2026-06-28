import { Button, Text, TextField } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useState } from "react";
import { useDevice } from "@/shared/layout/ui/DeviceContext";
import { DeviceDrawer } from "@/shared/layout/ui/DeviceDrawer";
import {
  MOCK_ACCOUNTS,
  type RecipientAccountDTO,
} from "@/shared/mocks/accounts";
import { useTransferStore } from "@/store/transfer/transfer-store";

const BANKS = ["하나은행", "국민은행", "기업은행", "농협은행"];

export function RecipientInputStep({ onNext }: { onNext: () => void }) {
  const { setRecipient } = useTransferStore((state) => ({
    setRecipient: state.setRecipient,
  }));
  const { closeDrawer, openDrawer } = useDevice();

  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    closeDrawer();
  };

  const handleSubmit = () => {
    if (selectedBank && accountNumber) {
      setRecipient("홍길동", selectedBank, accountNumber);
      onNext();
    }
  };

  const handleMockAccountClick = (account: RecipientAccountDTO) => {
    setRecipient(account.user.name, account.bank, account.account_number);
    onNext();
  };

  return (
    <Flex
      direction="column"
      width="full"
      gap={6}
      style={{ padding: "var(--space-4)", flex: 1 }}
    >
      <Flex direction="column" gap={2}>
        <Text as="h2" variant="title">
          이체할 계좌를 입력해 주세요.
        </Text>
        <Text variant="description" color="mutedForeground">
          최근 이체 목록이나 계좌번호를 직접 입력해주세요.
        </Text>
      </Flex>

      {/* MOCK_ACCOUNTS section */}
      <Flex direction="column" gap={3}>
        <Text variant="bodyStrong">내 계좌 및 최근 이체</Text>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {MOCK_ACCOUNTS.map((account) => (
            <li key={account.account_number}>
              <Button
                variant="transparent"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  padding: "var(--space-4)",
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
                onClick={() => handleMockAccountClick(account)}
                aria-label={`${account.user.name} 님의 ${account.bank} ${account.account_number} 계좌로 이체하기`}
              >
                <Flex direction="column" alignItems="flex-start" gap={1}>
                  <Text variant="bodyStrong">{account.user.name}</Text>
                  <Text variant="body" color="mutedForeground">
                    {account.bank} {account.account_number}
                  </Text>
                </Flex>
              </Button>
            </li>
          ))}
        </ul>
      </Flex>

      <Text variant="bodyStrong" style={{ marginTop: "var(--space-4)" }}>
        직접 입력
      </Text>

      <Button
        variant="default"
        onClick={openDrawer}
        style={{ justifyContent: "flex-start" }}
      >
        {selectedBank || "은행 또는 증권사 선택"}
      </Button>

      <TextField
        type="number"
        labelContent="계좌번호"
        placeholder="-없이 계좌번호 입력"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <Flex style={{ marginTop: "auto" }}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!selectedBank || !accountNumber}
          style={{ width: "100%" }}
        >
          확인
        </Button>
      </Flex>

      <DeviceDrawer>
        <Flex direction="column" gap={2} style={{ padding: "var(--space-4)" }}>
          <Text
            as="h3"
            variant="title"
            style={{ marginBottom: "var(--space-4)", textAlign: "center" }}
          >
            은행 선택
          </Text>
          {BANKS.map((bank) => (
            <Button
              key={bank}
              variant="transparent"
              onClick={() => handleBankSelect(bank)}
              style={{
                width: "100%",
                justifyContent: "center",
                backgroundColor: "var(--color-card)",
              }}
            >
              {bank}
            </Button>
          ))}
        </Flex>
      </DeviceDrawer>
    </Flex>
  );
}
