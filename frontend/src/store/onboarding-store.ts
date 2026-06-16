import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface OnboardingState {
  // 1. verify-info
  verifyName: string;
  verifyResidentNumber: string;
  verifyCarrier: string;
  verifyPhoneNumber: string;
  isVerifyInfoSubmitted: boolean;

  // 2. verify-otp
  smsCode: string;
  isSmsVerified: boolean;

  // 3. terms
  termsAgreed: boolean;
  optionalTerms: {
    personalInfoCollectionOptional: boolean;
    marketingSms: boolean;
    marketingCall: boolean;
    marketingEmail: boolean;
    marketingMail: boolean;
    personalInfoProvisionOptional: boolean;
    marketingPush: boolean;
  };

  // 4. id-card-selection / info
  selectedIdCardType: "resident" | "driver" | "passport" | null;
  idCardName: string;
  idCardResidentNumber: string;
  idCardIssueDate: string;
  isIdCardVerified: boolean;

  // 5. account
  accountNumber: string;
  isAccountVerified: boolean;

  // 6. pin-register
  pinNumber: string;
  isPinRegistered: boolean;
}

interface OnboardingActions {
  setVerifyInfo: (
    info: Pick<
      OnboardingState,
      | "verifyName"
      | "verifyResidentNumber"
      | "verifyCarrier"
      | "verifyPhoneNumber"
    >,
  ) => void;
  setVerifyInfoSubmitted: (submitted: boolean) => void;
  setSmsCode: (code: string) => void;
  setSmsVerified: (verified: boolean) => void;
  setTermsAgreed: (agreed: boolean) => void;
  setOptionalTerms: (terms: OnboardingState["optionalTerms"]) => void;
  setSelectedIdCardType: (type: OnboardingState["selectedIdCardType"]) => void;
  setIdCardDetails: (details: {
    idCardName: string;
    idCardResidentNumber: string;
    idCardIssueDate: string;
  }) => void;
  setIdCardVerified: (verified: boolean) => void;
  setAccountNumber: (account: string) => void;
  setAccountVerified: (verified: boolean) => void;
  setPinNumber: (pin: string) => void;
  setPinRegistered: (registered: boolean) => void;
  resetOnboarding: () => void;
}

const initialOnboardingState: OnboardingState = {
  verifyName: "",
  verifyResidentNumber: "",
  verifyCarrier: "",
  verifyPhoneNumber: "",
  isVerifyInfoSubmitted: false,
  smsCode: "",
  isSmsVerified: false,
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
  selectedIdCardType: null,
  idCardName: "",
  idCardResidentNumber: "",
  idCardIssueDate: "",
  isIdCardVerified: false,
  accountNumber: "",
  isAccountVerified: false,
  pinNumber: "",
  isPinRegistered: false,
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set) => ({
      ...initialOnboardingState,

      setVerifyInfo: (info) => set(info),
      setVerifyInfoSubmitted: (submitted) =>
        set({ isVerifyInfoSubmitted: submitted }),
      setSmsCode: (code) => set({ smsCode: code }),
      setSmsVerified: (verified) => set({ isSmsVerified: verified }),
      setTermsAgreed: (agreed) => set({ termsAgreed: agreed }),
      setOptionalTerms: (terms) => set({ optionalTerms: terms }),
      setSelectedIdCardType: (type) => set({ selectedIdCardType: type }),
      setIdCardDetails: (details) => set({ ...details }),
      setIdCardVerified: (verified) => set({ isIdCardVerified: verified }),
      setAccountNumber: (account) => set({ accountNumber: account }),
      setAccountVerified: (verified) => set({ isAccountVerified: verified }),
      setPinNumber: (pin) => set({ pinNumber: pin }),
      setPinRegistered: (registered) => set({ isPinRegistered: registered }),

      resetOnboarding: () => set(initialOnboardingState),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
