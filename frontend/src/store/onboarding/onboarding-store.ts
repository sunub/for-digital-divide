import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  createAccountSlice,
  initialAccountState,
} from "./slices/account-slice";
import { createIdCardSlice, initialIdCardState } from "./slices/id-card-slice";
import { createOtpSlice, initialOtpState } from "./slices/otp-slice";
import { createPinSlice, initialPinState } from "./slices/pin-slice";
import { createTermsSlice, initialTermsState } from "./slices/terms-slice";
import { createVerifySlice, initialVerifyState } from "./slices/verify-slice";
import type { OnboardingStore } from "./types";

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get, store) => ({
      ...createVerifySlice(set, get, store),
      ...createOtpSlice(set, get, store),
      ...createTermsSlice(set, get, store),
      ...createIdCardSlice(set, get, store),
      ...createAccountSlice(set, get, store),
      ...createPinSlice(set, get, store),

      resetOnboarding: () =>
        set({
          ...initialVerifyState,
          ...initialOtpState,
          ...initialTermsState,
          ...initialIdCardState,
          ...initialAccountState,
          ...initialPinState,
        }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        verifyName: state.verifyName,
        verifyResidentNumber: state.verifyResidentNumber,
        verifyCarrier: state.verifyCarrier,
        verifyPhoneNumber: state.verifyPhoneNumber,
        isVerifyInfoSubmitted: state.isVerifyInfoSubmitted,
        isSmsVerified: state.isSmsVerified,
        termsAgreed: state.termsAgreed,
        optionalTerms: state.optionalTerms,
        selectedIdCardType: state.selectedIdCardType,
        idCardName: state.idCardName,
        idCardResidentNumber: state.idCardResidentNumber,
        idCardIssueDate: state.idCardIssueDate,
        isIdCardVerified: state.isIdCardVerified,
      }),
    },
  ),
);

export type { OnboardingState } from "./types";
