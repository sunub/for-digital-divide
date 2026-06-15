import type { StepConfig } from "@/shared/hooks/useFunnel/types";
import type { OnboardingState } from "@/store/onboarding-store";

export const ONBOARDING_STEPS: StepConfig<OnboardingState>[] = [
  {
    id: "verify-selection",
    name: "인증 방식 선택",
    shouldRender: () => true,
  },
  {
    id: "verify-info",
    name: "본인인증 정보 입력",
    shouldRender: () => true,
  },
  {
    id: "verify-otp",
    name: "휴대폰 SMS 인증번호 입력",
    shouldRender: (state) => state.isVerifyInfoSubmitted,
  },
  {
    id: "terms",
    name: "약관 동의",
    shouldRender: (state) => state.isVerifyInfoSubmitted && state.isSmsVerified,
  },
  {
    id: "id-card-selection",
    name: "신분증 유형 선택",
    shouldRender: (state) =>
      state.isVerifyInfoSubmitted && state.isSmsVerified && state.termsAgreed,
  },
  {
    id: "id-card-info",
    name: "주민등록증 정보 입력",
    shouldRender: (state) =>
      state.isVerifyInfoSubmitted &&
      state.isSmsVerified &&
      state.termsAgreed &&
      state.selectedIdCardType === "resident",
  },
  {
    id: "account",
    name: "계좌 인증",
    shouldRender: (state) =>
      state.isVerifyInfoSubmitted &&
      state.isSmsVerified &&
      state.termsAgreed &&
      state.isIdCardVerified,
  },
  {
    id: "success",
    name: "검증 완료 성공",
    shouldRender: (state) =>
      state.isVerifyInfoSubmitted &&
      state.isSmsVerified &&
      state.termsAgreed &&
      state.isIdCardVerified &&
      state.isAccountVerified,
  },
  {
    id: "pin-register",
    name: "PIN 번호 등록",
    shouldRender: (state) =>
      state.isVerifyInfoSubmitted &&
      state.isSmsVerified &&
      state.termsAgreed &&
      state.isIdCardVerified &&
      state.isAccountVerified,
  },
];
