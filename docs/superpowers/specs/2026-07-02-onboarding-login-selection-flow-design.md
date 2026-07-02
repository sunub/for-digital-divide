# Onboarding Login Selection Flow Design

## Goal

After the user completes the current onboarding verification funnel, route them into an onboarding-owned login method selection flow instead of the existing success page. The flow should let the user choose email/password or PIN authentication, complete the required registration step for that method, then log in and continue to the dashboard.

## Chosen Flow

Use `/onboarding/login-selection` as the stable entry point and express sub-steps with query parameters:

```text
/onboarding
  -> /onboarding/login-selection
    -> /onboarding/login-selection?method=email&step=register
      -> /onboarding/login-selection?method=email&step=login
      -> /dashboard
    -> /onboarding/login-selection?method=pin&step=register
      -> /onboarding/login-selection?method=pin&step=login
      -> /dashboard
```

Valid `method` values are `email` and `pin`. Valid `step` values are `register` and `login`. Invalid or missing query values should render the base selection view rather than failing.

## Rationale

Keeping the flow under `/onboarding/login-selection` preserves the onboarding context. It avoids sending users to `/sign-up/register-user?next=...`, which is technically reusable but makes the URL and mental model feel like a separate sign-up journey.

The query model also keeps the branch state visible and shareable without adding many small route folders. It gives the guide area and mobile device frame one place to derive the active method and step.

## Component Boundaries

- `LoginSelection` becomes the branch container for the base selection view and method-specific steps.
- Existing email registration logic from `frontend/src/app/sign-up/register-user/` should be extracted into reusable form/action pieces when implementation begins, then rendered inside the onboarding selection route.
- Existing email login UI/action from `frontend/src/app/onboarding/email-password/` should be reused for `method=email&step=login`.
- Existing PIN registration behavior from `frontend/src/app/register-pin/` should be reused or lightly wrapped for `method=pin&step=register`.
- Existing PIN login behavior from `frontend/src/app/onboarding/Pin/` should be reused for `method=pin&step=login`.

## Navigation Rules

- The final onboarding funnel transition changes from `/onboarding/success` to `/onboarding/login-selection`.
- Base email card links to `/onboarding/login-selection?method=email&step=register`.
- Base PIN card links to `/onboarding/login-selection?method=pin&step=register`.
- Email registration success advances to `/onboarding/login-selection?method=email&step=login`.
- PIN registration success advances to `/onboarding/login-selection?method=pin&step=login`.
- Login success for either method keeps the existing dashboard redirect behavior.

## Success Page Handling

`/onboarding/success` should be removed from the primary flow. During implementation, prefer redirecting it to `/onboarding/login-selection` rather than deleting it immediately, because existing links or tests may still reference it.

## Error Handling

- Invalid query combinations fall back to the base selection view.
- Registration actions keep their existing validation messages.
- Method-specific registration should not store raw credentials in onboarding session state.
- Server actions that redirect must preserve existing redirect error handling.

## Testing

Implementation should verify:

- The final onboarding step navigates to `/onboarding/login-selection`.
- The base selection page renders email and PIN choices.
- Email selection renders the registration step, then advances to email login after successful registration.
- PIN selection renders the registration step, then advances to PIN login after successful registration.
- Invalid query params render the base selection view.
- Existing email login and PIN login still redirect to `/dashboard` on success.

## Out of Scope

- New authentication methods.
- Redesigning the visual style of the login cards.
- Replacing the existing register-user, email-password, register-pin, or PIN login business logic.
- Removing `/onboarding/success` outright.
