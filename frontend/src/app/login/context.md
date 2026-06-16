# Login Context

## 1. Role and Purpose
- Handles the entry page (`/login`), selection, and execution of various login methods (Email/Password or PIN-based) on a simulated desktop browser and mobile device frame.
- Hosts a multi-step onboarding/funnel sequence (using a client-side funnel pattern) to guide new or unverified users through identity verification (phone SMS OTP), terms agreement, ID verification, account confirmation, and PIN registration.
- Displays dynamic, responsive guide/educational sidebars to aid users depending on the active onboarding or login step.

## 2. Core Sub-domains
- [[LoginContentContainer](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/LoginContentContainer/context.md)]: Manages the client-side rendering of the multi-step onboarding/funnel steps and transitions.
- [[LoginGuide](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/LoginGuide/context.md)]: Dynamically renders educational guides/instructions corresponding to the current login step (`step` parameter from search parameters).
- [[LoginSelection](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/LoginSelection/context.md)]: Entry selection layout allowing users to pick between Email/Password or PIN login.
- [[Pin](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/Pin/context.md)]: Handles 4-digit PIN authentication using a secure random numpad.
- [[VerifyStep](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/VerifyStep/context.md)]: Identity verification route prompting choices like 휴대폰인증 (SMS validation) or certificates.
- [[email-password](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/email-password/context.md)]: Traditional authentication handling email/password login actions, input validations, and mock data seeding.

## 3. Shared Assets & Helpers
### Hooks (hooks/)
- `useAnimationOnce(skeletonRef: React.RefObject<HTMLDivElement | null>) => boolean`: Tracks whether the skeleton pulse animation has iterated at least once.
- `useRedirectDashboard(isSeedingCompleted: boolean) => void`: Prefetches and routes to `/dashboard` once mock account/transaction data seeding completes.

### Utilities (utils/)
- `hasPinAuthMethod(provider_uid: string) => Promise<boolean>`: Server action validating if a user has a registered PIN auth record.
- `zodResolver(schema: ZodSchema) => Resolver`: Lightweight custom Zod resolver for react-hook-form to perform type-safe validation.

### Types & Interfaces (types/)
- `type ActionState`: Custom type representing the unified server action response schema containing status states (`idle` | `continue` | `success` | `error` | etc.), payload message arrays, step progress states, and next-step redirection indicators.

### Onboarding Steps Components
- `AccountStep({ onNext: () => void }) => JSX.Element`: Renders input fields for account verification.
- `IdCardInfoStep({ onNext: () => void }) => JSX.Element`: Renders input fields for verification of resident identity cards.
- `IdCardSelectionStep({ onNext: () => void }) => JSX.Element`: Select screen for choosing between ID types.
- `IntroStep({ onNext: () => void }) => JSX.Element`: Welcoming panel to start the onboarding path.
- `PinRegisterStep({ onComplete: () => void }) => JSX.Element`: Screen to set up the 6-digit 간편 비밀번호 PIN login.
- `SuccessStep({ onNext: () => void }) => JSX.Element`: Success transition screen showing verification completion.
- `TermsStep({ onNext: () => void }) => JSX.Element`: Renders 약관 동의 (terms of service agreements).
- `VerifyInfoStep({ onNext: () => void }) => JSX.Element` (`VerifyInfoStep/VerifyInfoStep.tsx`): Collects and validates basic personal information (name, resident registration number front/back, carrier select, phone) using `react-hook-form` and `zodResolver` with split subcomponents, accessibility-aware field ids/names/labels, and input auto-format/focus interactions.
- `VerifyOtpStep({ onNext: () => void }) => JSX.Element` (`VerifyOtpStep/VerifyOtpStep.tsx`): Verification code input (SMS OTP validation) with split form helpers, input field component, and accessibility metadata.
- `VerifySelectionStep({ onNext: () => void }) => JSX.Element`: Gateway selection to begin SMS certification.

### Common UI Components (ui/)
- `EmailCard() => JSX.Element`: Card component mapping to Email login route.
- `PinNumberCard({ hasDeviceId: boolean }) => JSX.Element`: Card component mapping to PIN login route (disabled if device ID cookie is absent).
- `HoveringTextField({ hasDeviceId?: boolean }) => JSX.Element`: Graphical hover background effect inside method cards.
- `ToastMessage({ reason: string }) => null`: Emits toast alerts for registration status (e.g. `ALREADY_REGISTERED`, `PIN_NOT_VERIFIED`).
- `CardLayout(props) => JSX.Element`: Flex/Link container structure for selecting login methods.
- `CardContent(props) => JSX.Element`: Inner headers, body, and footers for the method cards.
- `CardSkeleton({ skeletonRef }) => JSX.Element`: Renders the placeholder card before mount animations finalize.
- `SmallCard(props) => JSX.Element`: A compact representation card component.

## 4. Directory Structure (Max Depth 3)
```
login/
├── LoginContentContainer/
│   ├── LoginContentContainer.tsx
│   ├── context.md
│   └── index.ts
├── LoginGuide/
│   ├── EmailLoginGuide.tsx
│   ├── IdentityVerificationGuide.tsx
│   ├── LoginGuide.tsx
│   ├── LoginMethodSelectionGuide.tsx
│   ├── PinLoginGuide.tsx
│   ├── context.md
│   └── index.ts
├── LoginSelection/
│   ├── LoginSelection.tsx
│   ├── context.md
│   └── index.ts
├── Pin/
│   ├── context.md
│   ├── index.ts
│   ├── ui/
│   └── utils/
├── VerifyStep/
│   ├── VerifyStep.css.ts
│   ├── VerifyStep.tsx
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
├── components/
│   ├── AccountStep.tsx
│   ├── IdCardInfoStep.tsx
│   ├── IdCardSelectionStep.tsx
│   ├── IntroStep.tsx
│   ├── PinRegisterStep.tsx
│   ├── SuccessStep.tsx
│   ├── TermsStep.tsx
│   └── VerifySelectionStep.tsx
├── email-password/
│   ├── context.md
│   ├── hooks/
│   ├── page.tsx
│   ├── ui/
│   └── utils/
├── funnelConfig.ts
├── hooks/
│   ├── useAnimationOnce.ts
│   └── useRedirectDashboard.ts
├── page.css.ts
├── page.tsx
├── types/
│   └── index.ts
├── ui/
│   ├── Card/
│   ├── EmailCard.tsx
│   ├── HoveringTextField.css.ts
│   ├── HoveringTextField.tsx
│   ├── PinNumberCard.tsx
│   └── ToastMessage.tsx
└── utils/
    ├── hasPinAuthMethod.ts
    └── zodResolver.ts
```
