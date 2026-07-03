import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAmountSlice, initialAmountState } from "./slices/amount-slice";
import { createMemoSlice, initialMemoState } from "./slices/memo-slice";
import {
  createRecipientSlice,
  initialRecipientState,
} from "./slices/recipient-slice";
import {
  createSourceAccountSlice,
  initialSourceAccountState,
} from "./slices/source-account-slice";
import type { TransferStore } from "./types";

export const useTransferStore = create<TransferStore>()(
  persist(
    (set, get, store) => ({
      ...createSourceAccountSlice(set, get, store),
      ...createRecipientSlice(set, get, store),
      ...createAmountSlice(set, get, store),
      ...createMemoSlice(set, get, store),

      resetTransfer: () =>
        set({
          ...initialSourceAccountState,
          ...initialRecipientState,
          ...initialAmountState,
          ...initialMemoState,
        }),
    }),
    {
      name: "transfer-storage",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        sourceAccount: state.sourceAccount,
        recipientName: state.recipientName,
        recipientBank: state.recipientBank,
        recipientAccountNumber: state.recipientAccountNumber,
        selectedRecipientAccount: state.selectedRecipientAccount,
        transferAmount: state.transferAmount,
        memoToRecipient: state.memoToRecipient,
        memoToMe: state.memoToMe,
      }),
    },
  ),
);

export type { TransferState } from "./types";
