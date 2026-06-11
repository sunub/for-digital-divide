# LoginGuide Context

## 1. Role and Purpose
- Dynamically renders educational guides/instructions corresponding to the current login step (`step` parameter from search parameters).
- Left-panel companion to the login screen, displaying information for email-input, pin-input, identity verification, and login method selection.

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
