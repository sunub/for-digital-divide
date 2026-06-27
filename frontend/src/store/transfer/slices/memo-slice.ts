import type { StateCreator } from "zustand";
import type { MemoState, TransferStore } from "../types";

export const initialMemoState: MemoState = {
  memoToRecipient: "",
  memoToMe: "",
};

export const createMemoSlice: StateCreator<
  TransferStore,
  [["zustand/persist", unknown]],
  [],
  MemoState & Pick<TransferStore, "setMemos">
> = (set) => ({
  ...initialMemoState,
  setMemos: (toRecipient, toMe) =>
    set({
      memoToRecipient: toRecipient,
      memoToMe: toMe,
    }),
});
