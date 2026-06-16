import { EmailLoginGuide } from "./EmailLoginGuide";
import { IdCardInfoGuide } from "./IdCardInfoGuide";
import { IdCardSelectionGuide } from "./IdCardSelectionGuide";
import { LoginMethodSelectionGuide } from "./LoginMethodSelectionGuide";
import { PinLoginGuide } from "./PinLoginGuide";
import { TermsGuide } from "./TermsGuide";
import { VerifyInfoGuide } from "./VerifyInfoGuide";
import { VerifyOtpGuide } from "./VerifyOtpGuide";
import { VerifySelectionGuide } from "./VerifySelectionGuide";

interface OnboardingGuideProps {
  step?: string;
}

export function OnboardingGuide({ step }: OnboardingGuideProps) {
  if (step === "email-input") {
    return <EmailLoginGuide />;
  }

  if (step === "pin-input") {
    return <PinLoginGuide />;
  }

  if (step === "verify-selection") {
    return <VerifySelectionGuide />;
  }

  if (step === "verify-info") {
    return <VerifyInfoGuide />;
  }

  if (step === "verify-otp") {
    return <VerifyOtpGuide />;
  }

  if (step === "terms") {
    return <TermsGuide />;
  }

  if (step === "id-card-selection") {
    return <IdCardSelectionGuide />;
  }

  if (step === "id-card-info") {
    return <IdCardInfoGuide />;
  }

  if (step === "verify" || !step) {
    return <VerifySelectionGuide />;
  }

  return <LoginMethodSelectionGuide />;
}
//
// {currentStepId === "verify-selection" && (
//   <VerifySelectionStep onNext={funnel.next} />
// )}
// {currentStepId === "verify-info" && (
//   <VerifyInfoStep onNext={funnel.next} />
// )}
// {currentStepId === "verify-otp" && (
//   <VerifyOtpStep onNext={funnel.next} />
// )}
// {currentStepId === "terms" && <TermsStep onNext={funnel.next} />}
// {currentStepId === "id-card-selection" && (
//   <IdCardSelectionStep onNext={funnel.next} />
// )}
// {currentStepId === "id-card-info" && (
//   <IdCardInfoStep onNext={funnel.next} />
// )}
// {currentStepId === "account" && <AccountStep onNext={funnel.next} />}
// {currentStepId === "success" && <SuccessStep onNext={funnel.next} />}
// {currentStepId === "pin-register" && (
//   <PinRegisterStep onComplete={handleCompleteOnboarding} />
// )}
