# email-password Context

## 1. Role and Purpose
- Handles traditional email-and-password-based login flow.
- Authenticates the user's credentials against the database using standard bcrypt matching, sets a session cookie, and initiates seeding of demo account/transaction data on successful login before redirecting to `/dashboard`.

## 2. Core Sub-domains
- N/A

## 3. Shared Assets & Helpers
### Hooks (hooks/)
- `useEmailValidation() => [string | null, (value: unknown) => boolean]`: Client-side validation hook using a Zod email schema (`EmailSchema`).
- `usePasswordValidation() => [string | null, (value: unknown) => boolean]`: Client-side validation hook checking password length and complexity constraints via `PasswordSchema`.
- `useSeedingDemoData(isSeedingProgress: boolean, onSeedingComplete: (completed: boolean) => void) => void`: Triggers database seeding of mock account and transaction data for new logins.

### Components (ui/)
- `Form({ children }: { children: React.ReactNode }) => JSX.Element`: Renders the base form wrapper, handles login/seeding states, and redirects to dashboard on completion.
- `MainTitle() => JSX.Element`: Renders a text-revealing spring animation for the "로그인" header.
- `StatusLoader({ isPending, children, actionState }: StatusLoaderProps) => JSX.Element`: Displays a status icon (rotating loader, success checkmark, or error shield) and status text.
- `SubmittingStatus({ actionState, isSubmitting, isPending, isSeedingProgress }) => JSX.Element`: Evaluates form submission and seeding states to render appropriate status loaders.

### Utilities (utils/)
- `emailPasswordLoginAction(prevState: ActionState, formData: FormData) => Promise<ActionState>`: Server action to validate credentials, authenticate the user, update the database session ID, and write the session cookie. Defined in `utils/emailPaswordLoginAction.ts`.
- `verifySessionCookie() => Promise<void>`: Server action that checks for an active session and redirects to `/dashboard` if already authenticated.

## 4. Directory Structure (Max Depth 3)
```
email-password/
├── hooks/
│   ├── useEmailValidation.ts
│   ├── usePasswordValidation.ts
│   └── useSeedingDemoData.ts
├── page.tsx
├── ui/
│   ├── Form.css.ts
│   ├── Form.tsx
│   ├── MainTitle.css.ts
│   ├── MainTitle.tsx
│   ├── StatusLoader.css.ts
│   ├── StatusLoader.tsx
│   └── SubmittingStatus.tsx
└── utils/
    ├── emailPaswordLoginAction.ts
    └── verifySessionCookie.ts
```
