# useFunnel Context

## 1. Role and Purpose
- Multi-step form (Funnel) navigation hook.
- Manages the active steps dynamically by evaluating `shouldRender` predicates against form data.
- Synchronizes step states with the URL `'step'` search parameter on the client-side using Next.js routing APIs (`useSearchParams`, `usePathname`, `useRouter`).

## 2. Core Files
- [useFunnel.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/shared/hooks/useFunnel/useFunnel.ts): Implements the hook logic including URL-based navigation, next/prev actions, active step calculations, and automatic redirect to the default step.
- [types.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/shared/hooks/useFunnel/types.ts): Declares `StepConfig` and `FunnelResult` interfaces.

## 3. Usage Pattern
- Invoked with a configurations list of `StepConfig<T>[]` and a reactive `formData: T`.
- Provides `next`, `prev`, `navigateTo` methods, along with `currentIndex` and `currentStepId` for conditional UI rendering.
