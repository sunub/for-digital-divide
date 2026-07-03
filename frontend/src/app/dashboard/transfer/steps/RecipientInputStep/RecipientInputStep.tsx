import { Flex } from "@internal/design-system/primitives";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDevice } from "@/shared/layout/ui/DeviceContext";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { TransferHeader } from "../../components/TransferHeader";
import { verifyRecipientAccountAction } from "../../utils/verifyRecipientAccountAction";
import {
  BankSelectionDrawer,
  ManualRecipientForm,
  RecipientInputHeader,
} from "./components";
import * as styles from "./RecipientInputStep.css";

export interface FormValues {
  bank: string;
  accountNumber: string;
}

interface VerifiedAccount {
  bank: string;
  account: string;
  name: string;
}

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

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      bank: "",
      accountNumber: "",
    },
  });

  const [isVerifying, setIsVerifying] = useState(false);

  const [verifiedAccount, setVerifiedAccount] =
    useState<VerifiedAccount | null>(null);

  const bankValue = watch("bank");
  const accountNumberValue = watch("accountNumber");

  const isVerified =
    verifiedAccount?.bank === bankValue &&
    verifiedAccount?.account === accountNumberValue;
  const currentVerifiedName = isVerified ? verifiedAccount.name : "";

  const handleBankSelect = (bank: string) => {
    setValue("bank", bank);
    clearErrors("bank");
    closeDrawer();
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.bank) {
      setError("bank", { type: "manual", message: "은행을 선택해 주세요." });
      return;
    }
    if (!data.accountNumber) {
      setError("accountNumber", {
        type: "manual",
        message: "계좌번호를 입력해 주세요.",
      });
      return;
    }

    if (isVerified) {
      setRecipient(currentVerifiedName, data.bank, data.accountNumber);
      onNext();
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifyRecipientAccountAction(
        data.bank,
        data.accountNumber,
      );
      if (result.success && result.name) {
        setVerifiedAccount({
          bank: data.bank,
          account: data.accountNumber,
          name: result.name,
        });
      } else {
        setError("accountNumber", {
          type: "manual",
          message: result.message || "계좌번호가 올바르지 않습니다.",
        });
      }
    } catch {
      setError("accountNumber", {
        type: "manual",
        message: "계좌 조회 중 오류가 발생했습니다.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={styles.recipientInputLayout}>
      <Flex
        direction="column"
        width="full"
        gap={6}
        p={4}
        className={styles.recipientInputContent}
      >
        <TransferHeader label="계좌선택으로 돌아가기" onClick={onPrev}>
          받는분
        </TransferHeader>
        <RecipientInputHeader />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <ManualRecipientForm
            control={control}
            errors={errors}
            onOpenBankSelection={openDrawer}
            verifiedRecipientName={verifiedAccount?.name ?? ""}
            isSubmitting={isVerifying}
          />
        </form>
      </Flex>
      <BankSelectionDrawer onSelectBank={handleBankSelect} />
    </div>
  );
}
