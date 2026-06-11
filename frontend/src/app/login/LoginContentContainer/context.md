# LoginContentContainer Context

## 1. Role and Purpose
- Renders the multi-step onboarding flow for login verification, using the `useFunnel` hook with step configurations defined in `funnelConfig.ts`.
- Manages animations using Framer Motion (`AnimationPresenceWrapper`) when transitioning between steps.
- Mounts steps only on client side to prevent layout shift (CLS).
- Resets onboarding state and redirects to `/dashboard` upon completing PIN registration.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
- N/A

## 4. Directory Structure (Max Depth 3)
```
LoginContentContainer/
├── LoginContentContainer.tsx
└── index.ts
```
