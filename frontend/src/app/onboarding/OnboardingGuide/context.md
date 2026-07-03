# OnboardingGuide Context

## 1. Role and Purpose
- **OnboardingGuide**: The main entry point component of this directory. It dynamically resolves and renders the appropriate sub-guide component based on the active `step` parameter.
  - `step === "email-input"` -> renders `EmailLoginGuide`
  - `step === "pin-input"` -> renders `PinLoginGuide`
  - `step === "verify-selection"` or `step === "verify"` or `step` is undefined -> renders `VerifySelectionGuide`
  - `step === "verify-info"` -> renders `VerifyInfoGuide`
  - `step === "verify-otp"` -> renders `VerifyOtpGuide`
  - `step === "terms"` -> renders `TermsGuide`
  - `step === "id-card-selection"` -> renders `IdCardSelectionGuide`
  - `step === "id-card-info"` -> renders `IdCardInfoGuide`
  - Any other value -> renders `LoginMethodSelectionGuide`
- **EmailLoginGuide**: Informs users about secure login practices, emphasizing password safety and logout guidelines.
- **PinLoginGuide**: Guides users on using the 6-digit PIN login, highlighting device-specific restrictions and limit controls (e.g., 5-failed attempt limit).
- **IdentityVerificationGuide**: Guides users through mobile phone verification steps, outlining the overall 3-step authentication/login setup flow.
- **LoginMethodSelectionGuide**: Offers guidance to help users choose between a registered PIN login or an email-based login.
- **OnboardingInstructionGuide**: Local composition helper that renders the shared `Instruction` layout for onboarding guide panels.
- **PhoneVerificationGuide / VerifySelectionGuide / VerifyInfoGuide / VerifyOtpGuide / TermsGuide / IdCardSelectionGuide / IdCardInfoGuide / IdCardVerificationGuide / SuccessGuide**: Step-specific onboarding guide panels that provide badge, title, explanatory info boxes, step instructions, and warnings through `Instruction` components.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
- N/A

## 4. Directory Structure (Max Depth 3)
```
OnboardingGuide/
├── EmailLoginGuide.tsx
├── IdCardInfoGuide.tsx
├── IdCardSelectionGuide.tsx
├── IdCardVerificationGuide.tsx
├── IdentityVerificationGuide.tsx
├── LoginGuid.css.ts
├── LoginMethodSelectionGuide.tsx
├── OnboardingGuide.tsx
├── OnboardingInstructionGuide.tsx
├── PhoneVerificationGuide.css.ts
├── PhoneVerificationGuide.tsx
├── PinLoginGuide.tsx
├── SuccessGuide.tsx
├── TermsGuide.tsx
├── VerifyInfoGuide.tsx
├── VerifyOtpGuide.tsx
├── VerifySelectionGuide.tsx
├── context.md
└── index.ts
```
