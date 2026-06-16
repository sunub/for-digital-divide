import type { StateCreator } from "zustand";
import type { OnboardingStore, TermsActions, TermsState } from "../types";

export type TermsSlice = TermsState & TermsActions;

export const initialTermsState: TermsState = {
  termsAgreed: false,
  optionalTerms: {
    personalInfoCollectionOptional: false,
    marketingSms: false,
    marketingCall: false,
    marketingEmail: false,
    marketingMail: false,
    personalInfoProvisionOptional: false,
    marketingPush: false,
  },
};

export const createTermsSlice: StateCreator<
  OnboardingStore,
  [],
  [],
  TermsSlice
> = (set) => ({
  ...initialTermsState,
  setTermsAgreed: (agreed) => set({ termsAgreed: agreed }),
  setOptionalTerms: (terms) => set({ optionalTerms: terms }),
});
