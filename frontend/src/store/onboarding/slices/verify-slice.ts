import type { StateCreator } from "zustand";
import type { OnboardingStore, VerifyActions, VerifyState } from "../types";

export type VerifySlice = VerifyState & VerifyActions;

export const initialVerifyState: VerifyState = {
  verifyName: "",
  verifyResidentNumber: "",
  verifyCarrier: "",
  verifyPhoneNumber: "",
  isVerifyInfoSubmitted: false,
};

export const createVerifySlice: StateCreator<
  OnboardingStore,
  [],
  [],
  VerifySlice
> = (set) => ({
  ...initialVerifyState,
  setVerifyInfo: (info) => set(info),
  setVerifyInfoSubmitted: (submitted) =>
    set({ isVerifyInfoSubmitted: submitted }),
});
