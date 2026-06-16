# Onboarding Store Context

## 1. Role and Purpose
- Manages the client-side state of the multi-step onboarding/funnel sequence (identity verification, terms agreement, ID verification, account confirmation, and PIN registration).
- Provides a unified store interface (`useOnboardingStore`) built using Zustand's Slice Pattern, facilitating state sharing and logic isolation across the steps.
- Restores active user inputs after page refreshes to optimize the experience (especially for digitally vulnerable users) while avoiding the persistence of raw credentials.

## 2. Store Structure (Slice Pattern)
The store is modularized into step-specific slices located in the `slices/` directory:
- **[verify-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/verify-slice.ts)**: Stores identity parameters (Name, masked Resident Registration Number, Carrier, Phone) and submission flags.
- **[otp-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/otp-slice.ts)**: Manages SMS OTP validation codes and OTP success status.
- **[terms-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/terms-slice.ts)**: Handles required/optional terms of service agreements.
- **[id-card-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/id-card-slice.ts)**: Holds selected ID card metadata (Name, masked Resident Registration Number, Issue Date, Card Type).
- **[account-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/account-slice.ts)**: Tracks bank account verification progress.
- **[pin-slice.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/store/onboarding/slices/pin-slice.ts)**: Controls mock state for simplified PIN authentication.

## 3. Persistence Policy (Whitelist)
To align with security best practices, the store is stored in `sessionStorage` under `onboarding-storage`, but only safe/semi-sensitive parameters are whitelisted:
- **Whitelisted**: Name, Carrier, Phone, Masked Resident Numbers, Step Completion Flags, Terms Agreement.
- **Blacklisted (Memory-Only)**: SMS OTP inputs (`smsCode`), bank account numbers (`accountNumber`), PIN credentials (`pinNumber`).

## 4. Glossary
- **Verify Resident Number (주민등록번호 마스킹)**: A partially masked RRN containing only the birthdate and gender digit (e.g. `960116-1000000`). Used to represent verification status without storing full credentials.
- **Whitelist Persistence (화이트리스트 영속화)**: A mechanism allowing only low-risk, UX-improving user inputs to be written to browser session storage, automatically discarding high-risk secrets.
