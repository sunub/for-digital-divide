import type { StateCreator } from "zustand";
import type { SourceAccountState, TransferStore } from "../types";

export const initialSourceAccountState: SourceAccountState = {
  sourceAccount: null,
};

export const createSourceAccountSlice: StateCreator<
  TransferStore,
  [["zustand/persist", unknown]],
  [],
  SourceAccountState & Pick<TransferStore, "setSourceAccount">
> = (set) => ({
  ...initialSourceAccountState,
  setSourceAccount: (accountNumber, accountType, balance) =>
    set({
      sourceAccount: {
        accountNumber,
        accountType,
        balance,
      },
    }),
});
