import type { StateCreator } from "zustand";
import type { RecipientState, TransferStore } from "../types";

export const initialRecipientState: RecipientState = {
  recipientName: "",
  recipientBank: "",
  recipientAccountNumber: "",
  selectedRecipientAccount: null,
};

export const createRecipientSlice: StateCreator<
  TransferStore,
  [["zustand/persist", unknown]],
  [],
  RecipientState & Pick<TransferStore, "setRecipient" | "setRecipientFromMock">
> = (set) => ({
  ...initialRecipientState,
  setRecipient: (name, bank, accountNumber) =>
    set({
      recipientName: name,
      recipientBank: bank,
      recipientAccountNumber: accountNumber,
      selectedRecipientAccount: null, // Reset when manually entered
    }),
  setRecipientFromMock: (account) =>
    set({
      selectedRecipientAccount: account,
      recipientName: account.user.name,
      recipientBank: account.bank,
      recipientAccountNumber: account.account_number,
    }),
});
