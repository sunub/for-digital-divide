# Pin Context

## 1. Role and Purpose
- Manages PIN-based authentication, rendering a 4-digit PIN numpad that fetches keypad layouts dynamically from the server (preventing visual logging / clickjacking).
- Authenticates the user's PIN against the database via server actions and creates a session cookie upon success.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
### Components (ui/)
- `LoginPinPage() => JSX.Element`: Renders the client-side PIN entry form and custom numpad layout provider.
### Utilities (utils/)
- `pinLoginAction(prevState: ActionState, formData: FormData) => Promise<ActionState>`: Server action to validate the submitted PIN code matching the device ID cookie, sets session, and returns action state.
- `reloadNumpad() => Promise<void>`: Server action to revalidate the Next.js cache tag for the keypad (`revalidateTag("keypad")`).

## 4. Directory Structure (Max Depth 3)
```
Pin/
├── index.ts
├── ui/
│   └── LoginPinPage.tsx
└── utils/
    ├── pinLoginAction.ts
    └── reload.ts
```
