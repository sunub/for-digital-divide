import type { StateCreator } from "zustand";
import type { AccountActions, AccountState, OnboardingStore } from "../types";

export type AccountSlice = AccountState & AccountActions;

export const initialAccountState: AccountState = {
  accountNumber: "",
  isAccountVerified: false,
};

export const createAccountSlice: StateCreator<
  OnboardingStore,
  [],
  [],
  AccountSlice
> = (set) => ({
  ...initialAccountState,
  setAccountNumber: (account) => set({ accountNumber: account }),
  setAccountVerified: (verified) => set({ isAccountVerified: verified }),
});
