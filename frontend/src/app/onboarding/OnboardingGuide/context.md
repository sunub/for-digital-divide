# LoginGuide Context

## 1. Role and Purpose
- **LoginGuide**: The main entry point component of this directory. It dynamically resolves and renders the appropriate sub-guide component based on the active `step` parameter.
  - `step === "email-input"` -> renders `EmailLoginGuide`
  - `step === "pin-input"` -> renders `PinLoginGuide`
  - `step === "verify"` or `step` is undefined -> renders `IdentityVerificationGuide`
  - Any other value -> renders `LoginMethodSelectionGuide`
- **EmailLoginGuide**: Informs users about secure login practices, emphasizing password safety and logout guidelines.
- **PinLoginGuide**: Guides users on using the 6-digit PIN login, highlighting device-specific restrictions and limit controls (e.g., 5-failed attempt limit).
- **IdentityVerificationGuide**: Guides users through mobile phone verification steps, outlining the overall 3-step authentication/login setup flow.
- **LoginMethodSelectionGuide**: Offers guidance to help users choose between a registered PIN login or an email-based login.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
- N/A

## 4. Directory Structure (Max Depth 3)
```
LoginGuide/
├── EmailLoginGuide.tsx
├── IdentityVerificationGuide.tsx
├── LoginGuide.tsx
├── LoginMethodSelectionGuide.tsx
├── PinLoginGuide.tsx
└── index.ts
```
