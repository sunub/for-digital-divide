# Onboarding Context

## 1. Role and Purpose
- Handles the entry page (`/onboarding`), selection, and execution of onboarding-adjacent login methods (Email/Password or PIN-based) on a simulated desktop browser and mobile device frame.
- Hosts a multi-step onboarding/funnel sequence (using a client-side funnel pattern) to guide new or unverified users through identity verification (phone SMS OTP), terms agreement, ID verification type selection, and ID card information entry.
- Once the identity verification and ID card steps are completed, the client-side funnel redirects the user to `/onboarding/login-selection`, where query parameters branch into email or PIN registration/login.
- Displays dynamic, responsive guide/educational sidebars to aid users depending on the active onboarding or login step.

## 2. Core Sub-domains
- [[OnboardingContentContainer](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/OnboardingContentContainer/context.md)]: Manages the client-side rendering of the multi-step onboarding/funnel steps and transitions.
- [[OnboardingGuide](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/OnboardingGuide/context.md)]: Dynamically renders educational guides/instructions corresponding to the current onboarding or login step.
- [[LoginSelection](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/context.md)]: Onboarding-owned selection and query parsing surface for email/PIN registration and login branches.
- [[Pin](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/Pin/context.md)]: Handles PIN authentication using a secure random numpad.
- [[VerifyStep](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/VerifyStep/context.md)]: Identity verification route prompting choices like 휴대폰인증 (SMS validation) or certificates.
- [[email-password](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/email-password/context.md)]: Traditional authentication handling email/password login actions, input validations, and mock data seeding.
- [[IdCardInfoStep](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/IdCardInfoStep/context.md)]: Renders and validates the identity-card confirmation step (주민등록증/운전면허증) in the onboarding flow.

## 3. Shared Assets & Helpers
### Hooks (hooks/)
- `useAnimationOnce(skeletonRef: React.RefObject<HTMLDivElement | null>) => boolean`: Tracks whether the skeleton pulse animation has iterated at least once.
- `useRedirectDashboard(isSeedingCompleted: boolean) => void`: Prefetches and routes to `/dashboard` once mock account/transaction data seeding completes.

### Utilities (utils/)
- `hasPinAuthMethod(provider_uid: string) => Promise<boolean>`: Server action validating if a user has a registered PIN auth record.
- `zodResolver(schema: ZodSchema) => Resolver`: Lightweight custom Zod resolver for react-hook-form to perform type-safe validation.

### Types & Interfaces (types/)
- `type ActionState`: Custom type representing the unified server action response schema containing status states, payload message arrays, step progress states, and next-step redirection indicators.

### Onboarding Steps Components
- `VerifySelectionStep({ onNext: () => void }) => JSX.Element` (`components/VerifySelectionStep.tsx`): First step in the onboarding funnel, allows selection of identity verification method (e.g. mobile verification).
- `VerifyInfoStep({ onNext: () => void }) => JSX.Element` (`VerifyInfoStep/VerifyInfoStep.tsx`): Collects and validates basic personal information (name, resident registration number front/back, carrier select, phone) using `react-hook-form` and `zodResolver` with split subcomponents, accessibility-aware field ids/names/labels, and input auto-format/focus interactions.
- `VerifyOtpStep({ onNext: () => void }) => JSX.Element` (`VerifyOtpStep/VerifyOtpStep.tsx`): Verification code input (SMS OTP validation) with split form helpers, input field component, and accessibility metadata.
- `TermsStep({ onNext: () => void }) => JSX.Element` (`TermsStep/TermsStep.tsx`): Guides users through 약관 동의 (Required & Optional terms of service agreements) with custom checkbox lists.
- `IdCardSelectionStep({ onNext: () => void }) => JSX.Element` (`IdCardSelectionStep/IdCardSelectionStep.tsx`): Renders illustrations to select between resident identity card and driver's license.
- `IdCardInfoStep({ onNext: () => void }) => JSX.Element` (`IdCardInfoStep/IdCardInfoStep.tsx`): Collects resident registration or driver's license details, featuring live mockup card preview and field validations.
- `AccountStep({ onNext: () => void }) => JSX.Element` (`components/AccountStep.tsx`): Commented out/inactive onboarding step for account verification.
- `IntroStep({ onNext: () => void }) => JSX.Element` (`components/IntroStep.tsx`): Commented out/inactive onboarding welcomes panel.

### Login Selection & Navigation Components
- `LoginSelectionPage() => JSX.Element` (`login-selection/page.tsx`): Server route that parses `method=email|pin` and `step=register|login`, then renders base selection, email registration/login, or PIN registration/login.
- `SuccessPage() => never` (`success/page.tsx`): Legacy route that redirects to `/onboarding/login-selection`.

### Common UI Components (ui/)
- `EmailCard({ href?: string }) => JSX.Element`: Card component mapping to an email login or registration route.
- `PinNumberCard({ hasDeviceId: boolean, href?: string, disabled?: boolean }) => JSX.Element`: Card component mapping to a PIN login or registration route.
- `HoveringTextField({ hasDeviceId?: boolean }) => JSX.Element`: Graphical hover background effect inside method cards.
- `ToastMessage({ reason: string }) => null`: Emits toast alerts for registration status (e.g. `ALREADY_REGISTERED`, `PIN_NOT_VERIFIED`).
- `CardLayout(props) => JSX.Element`: Flex/Link container structure for selecting login methods.
- `CardContent(props) => JSX.Element`: Inner headers, body, and footers for the method cards.
- `CardSkeleton({ skeletonRef }) => JSX.Element`: Renders the placeholder card before mount animations finalize.
- `SmallCard(props) => JSX.Element`: A compact representation card component.

## 4. Directory Structure (Max Depth 3)
```text
onboarding/
├── LoginContentContainer/
│   ├── LoginContentContainer.tsx
│   ├── context.md
│   └── index.ts
├── LoginGuide/
│   ├── EmailLoginGuide.tsx
│   ├── IdCardVerificationGuide.css.ts
│   ├── IdCardVerificationGuide.tsx
│   ├── IdentityVerificationGuide.tsx
│   ├── LoginGuide.tsx
│   ├── LoginMethodSelectionGuide.tsx
│   ├── PinLoginGuide.tsx
│   ├── context.md
│   └── index.ts
├── LoginSelection/
│   ├── LoginSelection.tsx
│   ├── context.md
│   ├── index.ts
│   ├── loginSelectionParams.test.ts
│   └── loginSelectionParams.ts
├── login-selection/
│   └── page.tsx
├── Pin/
│   ├── context.md
│   ├── index.ts
│   ├── ui/
│   └── utils/
├── VerifyStep/
│   ├── VerifyCertificateGuideDialog.tsx
│   ├── VerifyMethodOptionField.tsx
│   ├── VerifyMethodSelectionForm.tsx
│   ├── VerifyStep.css.ts
│   ├── VerifyStep.tsx
│   ├── VerifyStep.types.ts
│   └── context.md
├── VerifyInfoStep/
│   ├── CarrierField.tsx
│   ├── NameField.tsx
│   ├── PhoneField.tsx
│   ├── ResidentNumberField.tsx
│   ├── VerifyInfoStep.css.ts
│   ├── VerifyInfoStep.tsx
│   ├── VerifyInfoStepHeader.tsx
│   ├── form.ts
│   └── index.ts
├── VerifyOtpStep/
│   ├── OtpCodeField.tsx
│   ├── VerifyOtpStep.css.ts
│   ├── VerifyOtpStep.tsx
│   ├── VerifyOtpStepHeader.tsx
│   ├── form.ts
│   └── index.ts
├── IdCardInfoStep/
│   ├── IdCardInfoStep.css.ts
│   ├── IdCardInfoStep.tsx
│   ├── IssueDateField.tsx
│   ├── NameField.tsx
│   ├── ResidentNumberField.tsx
│   ├── context.md
│   ├── form.ts
│   └── index.ts
├── IdCardSelectionStep/
│   ├── IdCardIllustration.css.ts
│   ├── IdCardIllustration.tsx
│   ├── IdCardOption.tsx
│   ├── IdCardSelectionStep.css.ts
│   ├── IdCardSelectionStep.tsx
│   └── index.ts
├── TermsStep/
│   ├── TermsStep.css.ts
│   ├── TermsStep.tsx
│   ├── components/
│   └── schema.ts
├── components/
│   ├── AccountStep.tsx
│   ├── IntroStep.tsx
│   └── VerifySelectionStep.tsx
├── email-password/
│   ├── context.md
│   ├── hooks/
│   ├── page.tsx
│   ├── ui/
│   └── utils/
├── success/
│   ├── SuccessStep/
│   └── page.tsx
├── ui/
│   ├── Card/
│   ├── EmailCard.tsx
│   ├── HoveringTextField.css.ts
│   ├── HoveringTextField.tsx
│   ├── PinNumberCard.tsx
│   └── ToastMessage.tsx
├── utils/
│   ├── hasPinAuthMethod.ts
│   └── zodResolver.ts
├── style/
│   └── Login.css.ts
├── funnelConfig.ts
├── hooks/
│   ├── useAnimationOnce.ts
│   └── useRedirectDashboard.ts
├── page.css.ts
├── page.tsx
└── types/
    └── index.ts
```
