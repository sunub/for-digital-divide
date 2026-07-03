# LoginSelection Context

## 1. Role and Purpose
- Displays the onboarding-owned login method selection interface after the identity verification funnel is complete.
- Routes users into query-based email or PIN registration/login branches under `/onboarding/login-selection`.
- Uses [EmailCard](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/ui/EmailCard.tsx) and [PinNumberCard](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/ui/PinNumberCard.tsx) as the selection affordances.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
- `parseLoginSelectionParams(params)`: Validates `method=email|pin` and `step=register|login`, falling back to the base selection view for invalid query combinations.

## 4. Directory Structure (Max Depth 3)
```
LoginSelection/
├── [LoginSelection.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/LoginSelection.tsx)
├── [context.md](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/context.md)
├── [index.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/index.ts)
├── [loginSelectionParams.test.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/loginSelectionParams.test.ts)
└── [loginSelectionParams.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/onboarding/LoginSelection/loginSelectionParams.ts)
```
