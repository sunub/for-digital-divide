import { Flex } from "@internal/design-system/primitives";
import { useState } from "react";
import { useDevice } from "@/shared/layout/ui/DeviceContext";
import { useTransferStore } from "@/store/transfer/transfer-store";
import {
  BankSelectionDrawer,
  ManualRecipientForm,
  RecipientInputHeader,
} from "./components";
import { TransferHeader } from "../../components/TransferHeader";

interface RecipientInputStepProps {
  onNext: () => void;
  onPrev: () => void;
}

export function RecipientInputStep({
  onNext,
  onPrev,
}: RecipientInputStepProps) {
  const setRecipient = useTransferStore((state) => state.setRecipient);
  const { closeDrawer, openDrawer } = useDevice();

  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleBankSelect = (bank: string) => {
    setSelectedBank(bank);
    closeDrawer();
  };

  const handleSubmit = () => {
    if (!selectedBank || !accountNumber) {
      return;
    }

    setRecipient("홍길동", selectedBank, accountNumber);
    onNext();
  };

  return (
    <Flex direction="column" width="full" gap={6} p={4} style={{ flex: 1 }}>
      <TransferHeader label="계좌선택으로 돌아가기" onClick={onPrev}>
        받는분
      </TransferHeader>
      <RecipientInputHeader onPrev={onPrev} />
      <ManualRecipientForm
        selectedBank={selectedBank}
        accountNumber={accountNumber}
        onAccountNumberChange={setAccountNumber}
        onOpenBankSelection={openDrawer}
        onCloseBankSelection={closeDrawer}
        onSubmit={handleSubmit}
      />

      <BankSelectionDrawer onSelectBank={handleBankSelect} />
    </Flex>
  );
}
