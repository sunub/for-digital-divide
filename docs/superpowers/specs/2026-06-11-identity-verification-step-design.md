# Design Spec: Identity Verification Step (본인확인) in Login Funnel

This design specification details the integration of a new "본인확인" (Identity Verification) step into the login flow of the "For-digital-divide" application. This step precedes the login method selection step and utilizes the SPA Funnel architecture already established in the codebase.

## Goal & Background
To bridge the digital divide, users navigating from the Intro page (`/intro`) to the Login page (`/login`) must perform an Identity Verification ("본인확인") step. 
* **User Flow**: `/intro` $\rightarrow$ `/login` (defaults to step `verify` / "본인확인") $\rightarrow$ `/login?step=selection` (method selection) $\rightarrow$ `/login?step=email-input` or `/login?step=pin-input`.
* **Visual Direction**: The left panel guide layout on the verification step should match the `intro` page (using step lists, badges, and info boxes). The right panel (phone mockup) should present two choices:
  1. **국민인증서** (KB Certificate): Triggers an informative modal prompting the user to select the mobile verification method.
  2. **휴대폰 인증** (Phone Verification): Navigates to the next funnel step (`/login?step=selection`) using `next/link` combined with the design system's `ThreeDButton` and highlighted with the visual glow effect (`actionNextStepGlow`) from `packages/design-system/src/styles/effects.css.ts`.

---

## Proposed Changes

### 1. Funnel Configuration
#### [MODIFY] [funnelConfig.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/funnelConfig.ts)
* Add `verify` to the `method` union type in `LoginFunnelData` if applicable.
* Add the `verify` step configuration at the very beginning of the `LOGIN_FUNNEL_STEPS` array.

### 2. Login Page Left Panel (Instruction Guide)
#### [MODIFY] [page.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/page.tsx)
* Add a condition inside `LoginGuide` when `step` is `"verify"` or when no step parameter is present (as it defaults to `verify`).
* The UI layout will include:
  * `Instruction.Badge` for "본인 확인"
  * `Instruction.Title` with description: "안전한 금융 거래를 위해 본인 확인을 해주세요"
  * `Instruction.InfoBox` explaining the importance of verification.
  * `Instruction.List` with 3 steps showing:
    1. **본인확인** (Active): 휴대폰 인증을 통해 실명 검증을 완료합니다. (화면에서 빛나고 있는 **휴대폰 인증**을 선택해 주세요.)
    2. **로그인 방식 선택**: PIN 또는 이메일 로그인 수단을 설정합니다.
    3. **서비스 이용 시작**: 안전하게 금융 서비스를 이용할 수 있습니다.

### 3. Login Content Container Integration
#### [MODIFY] [LoginContentContainer.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/LoginContentContainer/LoginContentContainer.tsx)
* Map step `verify` to the `method` value `"verify"`.
* Render the new `<VerifyStep />` component when `currentStepId` is `"verify"`.

### 4. Verification Step Component (Right Panel)
#### [NEW] [VerifyStep.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/VerifyStep/VerifyStep.tsx)
* Renders inside the mobile device content frame.
* Renders two verification options:
  * **국민인증서**: Standard styled button wrapped in an `AlertDialog` trigger that launches the modal.
  * **휴대폰 인증**: A `ThreeDButton` with `as={Link}` pointing to `/login?step=selection`, featuring the `actionNextStepGlow` animation to guide the user.
* Renders the `AlertDialogContent` containing description guidance instructing the user to close the modal and click "휴대폰 인증".

---

## Verification & Testing Plan

### Manual Verification
1. Access the Next.js development server.
2. Click "시작하기" on `/` $\rightarrow$ navigates to `/intro`.
3. Click "인증서 발급하기" on `/intro` $\rightarrow$ redirects to `/login` (defaulting to step `verify`).
4. **Left Panel Validation**: Verify the guide displays the verification text, active Step 1, and the instructions to click the glowing button.
5. **Right Panel Validation**: Verify the "휴대폰 인증" button is pulsating and glowing, and that "국민인증서" triggers the information modal.
6. **Modal Validation**: Click "국민인증서", check that the dialog overlays the viewport properly, and that clicking the close button ("취소하기") closes the dialog.
7. **Transition Validation**: Click "휴대폰 인증", verify it transitions smoothly to the login method selection screen (`/login?step=selection`) with the entry/exit animations.
