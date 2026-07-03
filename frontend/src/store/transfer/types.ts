import type { RecipientAccountDTO } from "@/shared/mocks/accounts";

export interface RecipientState {
  recipientName: string;
  recipientBank: string;
  recipientAccountNumber: string;
  selectedRecipientAccount: RecipientAccountDTO | null;
}

export interface AmountState {
  transferAmount: string;
}

export interface MemoState {
  memoToRecipient: string;
  memoToMe: string;
}

export interface SourceAccountState {
  sourceAccount: {
    accountNumber: number;
    accountType: string;
  } | null;
}

export interface TransferState
  extends RecipientState,
    AmountState,
    MemoState,
    SourceAccountState {}

export interface TransferActions {
  setSourceAccount: (accountNumber: number, accountType: string) => void;
  setRecipient: (name: string, bank: string, accountNumber: string) => void;
  setRecipientFromMock: (account: RecipientAccountDTO) => void;
  setAmount: (amount: string) => void;
  setMemos: (toRecipient: string, toMe: string) => void;
  resetTransfer: () => void;
}

export type TransferStore = TransferState & TransferActions;
