import type { StateCreator } from "zustand";
import type { OnboardingStore, OtpActions, OtpState } from "../types";

export type OtpSlice = OtpState & OtpActions;

export const initialOtpState: OtpState = {
  smsCode: "",
  isSmsVerified: false,
};

export const createOtpSlice: StateCreator<OnboardingStore, [], [], OtpSlice> = (
  set,
) => ({
  ...initialOtpState,
  setSmsCode: (code) => set({ smsCode: code }),
  setSmsVerified: (verified) => set({ isSmsVerified: verified }),
});
