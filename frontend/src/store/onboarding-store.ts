import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

  // 4. id-card-selection / info
  selectedIdCardType: "resident" | "driver" | "passport" | null;
  idCardInfo: string;
  isIdCardVerified: boolean;

  // 5. account
  accountNumber: string;
  isAccountVerified: boolean;

  // 6. pin-register
  pinNumber: string;
  isPinRegistered: boolean;
}

interface OnboardingActions {
  setVerifyInfo: (info: Pick<OnboardingState, "verifyName" | "verifyResidentNumber" | "verifyCarrier" | "verifyPhoneNumber">) => void;
  setVerifyInfoSubmitted: (submitted: boolean) => void;
  setSmsCode: (code: string) => void;
  setSmsVerified: (verified: boolean) => void;
  setTermsAgreed: (agreed: boolean) => void;
  setSelectedIdCardType: (type: OnboardingState["selectedIdCardType"]) => void;
  setIdCardInfo: (info: string) => void;
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
  selectedIdCardType: null,
  idCardInfo: "",
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
      setVerifyInfoSubmitted: (submitted) => set({ isVerifyInfoSubmitted: submitted }),
      setSmsCode: (code) => set({ smsCode: code }),
      setSmsVerified: (verified) => set({ isSmsVerified: verified }),
      setTermsAgreed: (agreed) => set({ termsAgreed: agreed }),
      setSelectedIdCardType: (type) => set({ selectedIdCardType: type }),
      setIdCardInfo: (info) => set({ idCardInfo: info }),
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
    }
  )
);
