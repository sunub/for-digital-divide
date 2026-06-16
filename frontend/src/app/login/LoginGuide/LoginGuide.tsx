import { EmailLoginGuide } from "./EmailLoginGuide";
import { IdCardVerificationGuide } from "./IdCardVerificationGuide";
import { IdentityVerificationGuide } from "./IdentityVerificationGuide";
import { LoginMethodSelectionGuide } from "./LoginMethodSelectionGuide";
import { PinLoginGuide } from "./PinLoginGuide";

interface LoginGuideProps {
  step?: string;
}

export function LoginGuide({ step }: LoginGuideProps) {
  if (step === "email-input") {
    return <EmailLoginGuide />;
  }

  if (step === "pin-input") {
    return <PinLoginGuide />;
  }

  if (step === "verify" || !step) {
    return <IdentityVerificationGuide />;
  }

  if (step === "id-card-selection" || step === "id-card-info") {
    return <IdCardVerificationGuide />;
  }
  // {step === "verify-selection" && (
  //   <VerifySelectionStepGuid />
  // )}
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
