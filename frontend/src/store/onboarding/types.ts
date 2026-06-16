export interface VerifyState {
  verifyName: string;
  verifyResidentNumber: string;
  verifyCarrier: string;
  verifyPhoneNumber: string;
  isVerifyInfoSubmitted: boolean;
}

export interface VerifyActions {
  setVerifyInfo: (
    info: Pick<
      VerifyState,
      | "verifyName"
      | "verifyResidentNumber"
      | "verifyCarrier"
      | "verifyPhoneNumber"
    >,
  ) => void;
  setVerifyInfoSubmitted: (submitted: boolean) => void;
}

export interface OtpState {
  smsCode: string;
  isSmsVerified: boolean;
}

export interface OtpActions {
  setSmsCode: (code: string) => void;
  setSmsVerified: (verified: boolean) => void;
}

export interface TermsState {
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
}

export interface TermsActions {
  setTermsAgreed: (agreed: boolean) => void;
  setOptionalTerms: (terms: TermsState["optionalTerms"]) => void;
}

export interface IdCardState {
  selectedIdCardType: "resident" | "driver" | "passport" | null;
  idCardName: string;
  idCardResidentNumber: string;
  idCardIssueDate: string;
  isIdCardVerified: boolean;
}

export interface IdCardActions {
  setSelectedIdCardType: (type: IdCardState["selectedIdCardType"]) => void;
  setIdCardDetails: (details: {
    idCardName: string;
    idCardResidentNumber: string;
    idCardIssueDate: string;
  }) => void;
  setIdCardVerified: (verified: boolean) => void;
}

export interface AccountState {
  accountNumber: string;
  isAccountVerified: boolean;
}

export interface AccountActions {
  setAccountNumber: (account: string) => void;
  setAccountVerified: (verified: boolean) => void;
}

export interface PinState {
  pinNumber: string;
  isPinRegistered: boolean;
}

export interface PinActions {
  setPinNumber: (pin: string) => void;
  setPinRegistered: (registered: boolean) => void;
}

export interface GlobalActions {
  resetOnboarding: () => void;
}

export type OnboardingState = VerifyState &
  OtpState &
  TermsState &
  IdCardState &
  AccountState &
  PinState;

export type OnboardingStore = OnboardingState &
  VerifyActions &
  OtpActions &
  TermsActions &
  IdCardActions &
  AccountActions &
  PinActions &
  GlobalActions;
