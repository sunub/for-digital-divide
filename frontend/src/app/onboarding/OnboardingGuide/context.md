# OnboardingGuide Context

## 1. Role and Purpose
- Renders the left-side guide panel (outside the mobile device frame) for onboarding and login screens. The frame holds the user's controls; this panel explains what to do and why (Action-Explanation Split, Flow-Synced Guidance in `CONTEXT.md`).
- **OnboardingGuide** (`OnboardingGuide.tsx`): Entry component. Resolves the sub-guide from the `step` prop, which pages pass from the URL search params.
  - `email-input` → `EmailLoginGuide` (shared by email register and email login)
  - `pin-input` → `PinLoginGuide`
  - `verify-selection` → `VerifySelectionGuide`
  - `verify-info` → `VerifyInfoGuide`
  - `verify-otp` → `VerifyOtpGuide`
  - `terms` → `TermsGuide`
  - `id-card-selection` → `IdCardSelectionGuide`
  - `id-card-info` → `IdCardInfoGuide`
  - `verify` or no step → `VerifySelectionGuide`
  - any other value (e.g. `login-selection`) → `LoginMethodSelectionGuide`
- Callers: `app/onboarding/page.tsx` (funnel steps) and `app/onboarding/login-selection/page.tsx` (maps the view to `login-selection` / `email-input` / `pin-input`).

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
- `IdCardVerificationGuide.tsx`, `IdentityVerificationGuide.tsx`, `PhoneVerificationGuide.tsx`, `SuccessGuide.tsx`: guide components present in the folder but not routed by `OnboardingGuide`.
- Styles: `LoginGuid.css.ts`, `PhoneVerificationGuide.css.ts` (its `panelContainer` is also reused by `dashboard/transfer/TransferGuide.tsx`), `VerifySelectionGuide.css.ts`, `IdCardVerificationGuide.css.ts`.
- E2E coverage: `frontend/e2e/guide-sync.spec.ts` checks that each step's guide heading renders outside the frame and changes with the step.

## 4. Directory Structure (Max Depth 3)
```
OnboardingGuide/
├── EmailLoginGuide.tsx
├── IdCardInfoGuide.tsx
├── IdCardSelectionGuide.tsx
├── IdCardVerificationGuide.css.ts
├── IdCardVerificationGuide.tsx
├── IdentityVerificationGuide.tsx
├── LoginGuid.css.ts
├── LoginMethodSelectionGuide.tsx
├── OnboardingGuide.tsx
├── PhoneVerificationGuide.css.ts
├── PhoneVerificationGuide.tsx
├── PinLoginGuide.tsx
├── SuccessGuide.tsx
├── TermsGuide.tsx
├── VerifyInfoGuide.tsx
├── VerifyOtpGuide.tsx
├── VerifySelectionGuide.css.ts
├── VerifySelectionGuide.tsx
├── context.md
└── index.ts
```
