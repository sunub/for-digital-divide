import type { StateCreator } from "zustand";
import type { AmountState, TransferStore } from "../types";

export const initialAmountState: AmountState = {
  transferAmount: "",
};

export const createAmountSlice: StateCreator<
  TransferStore,
  [["zustand/persist", unknown]],
  [],
  AmountState & Pick<TransferStore, "setAmount">
> = (set) => ({
  ...initialAmountState,
  setAmount: (amount) => set({ transferAmount: amount }),
});
