# IdCardInfoStep Context

## 1. Role and Purpose
- This domain renders and validates the identity-card confirmation step in the login onboarding flow.
- It coordinates form state with `react-hook-form`, validates input with `zod`, and writes verified ID-card data into onboarding store state.
- It also presents a live card preview synced with user input values (`name`, resident number front part, and issue date).

## 2. Core Sub-domains
- [IdCardInfoStep](./IdCardInfoStep.tsx): Step orchestrator. Binds form, computes field-level error messages, persists normalized values to store, and advances the funnel with `onNext`.
- [NameField](./NameField.tsx): Controlled name input field wrapper.
- [ResidentNumberField](./ResidentNumberField.tsx): Split resident number input group (front 6 digits + masked back first digit) with sanitization and auto-focus behavior.
- [IssueDateField](./IssueDateField.tsx): Controlled issue-date input with `YYYY.MM.DD` formatter.
- [form](./form.ts): Validation schema, error IDs/messages, and reusable input sanitizers/formatters.

## 3. Shared Assets & Helpers
### Hooks (hooks/)
- No local custom hooks are defined in this directory.

### Utilities (utils/)
- `getIdCardErrorMessage(errorCode?: string) => string | undefined`: Maps schema error codes to user-facing Korean messages.
- `sanitizeResidentFront(value: string) => string`: Keeps numeric characters only and truncates to 6 digits.
- `sanitizeResidentBack(value: string) => string`: Keeps numeric characters only and truncates to 1 digit.
- `formatIssueDate(value: string) => string`: Converts raw numeric input into `YYYY.MM.DD` progressively.

### Types & Interfaces (types/)
- `type IdCardFormData = z.infer<typeof idCardSchema>`: Canonical form value shape (`name`, `residentFront`, `residentBack`, `issueDate`).
- `interface IdCardInfoStepProps`: `{ onNext: () => void }`.
- `interface NameFieldProps`: `{ control: Control<IdCardFormData>; hasError: boolean; errorMessage?: string }`.
- `interface ResidentNumberFieldProps`: `{ control: Control<IdCardFormData>; residentBackRef: RefObject<HTMLInputElement | null>; hasError: boolean; errorMessage?: string; errorId?: string }`.
- `interface IssueDateFieldProps`: `{ control: Control<IdCardFormData>; hasError: boolean; errorMessage?: string }`.

## 4. Directory Structure (Max Depth 3)
```text
IdCardInfoStep/
  context.md
  form.ts
  IdCardInfoStep.tsx
  NameField.tsx
  ResidentNumberField.tsx
  IssueDateField.tsx
  IdCardInfoStep.css.ts
  index.ts
```
