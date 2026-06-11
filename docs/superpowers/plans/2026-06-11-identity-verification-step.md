# Identity Verification Step Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate a "본인확인" (Identity Verification) step as the first step in the login SPA funnel, providing choices for KB Certificate (guided modal) and Phone Verification (next step with glow).

**Architecture:** Extend the `useFunnel` configuration in `funnelConfig.ts`. Toggle left panel instructions in `login/page.tsx`, and add a new `VerifyStep` component in the right panel phone simulator that triggers an AlertDialog and redirects step routing.

**Tech Stack:** Next.js, Radix UI Slot/Radix UI Portal (used inside AlertDialog), Vanilla-Extract CSS, Framer Motion.

---

## Proposed Changes

### Task 1: Funnel Configuration Update
**Files:**
* Modify: [funnelConfig.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/funnelConfig.ts)

- [ ] **Step 1: Modify types and steps**
  Update `LoginFunnelData` to allow `"verify"` as a method, and add `verify` as the first step in `LOGIN_FUNNEL_STEPS`.
  
  ```typescript
  export interface LoginFunnelData {
    method: "default" | "email" | "pin" | "verify";
    hasPinLoginAvailable: boolean;
    isSeedingComplete: boolean;
  }

  export const LOGIN_FUNNEL_STEPS: StepConfig<LoginFunnelData>[] = [
    {
      id: "verify",
      name: "본인확인",
    },
    {
      id: "selection",
      name: "로그인 방식 선택",
    },
    {
      id: "email-input",
      name: "이메일 로그인",
      shouldRender: (data) => data.method === "email",
    },
    {
      id: "pin-input",
      name: "핀번호 로그인",
      shouldRender: (data) => data.method === "pin" && data.hasPinLoginAvailable,
    },
  ];
  ```

- [ ] **Step 2: Verify TypeScript compiles**
  Check the file compiles without type errors.

- [ ] **Step 3: Commit**
  ```bash
  git add frontend/src/app/login/funnelConfig.ts
  git commit -m "feat(login): add verify step to LOGIN_FUNNEL_STEPS"
  ```

---

### Task 2: Left Panel Guide UI Update
**Files:**
* Modify: [page.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/page.tsx)

- [ ] **Step 1: Modify `LoginGuide` to render the verification instructions**
  Render the verification instructions when `step` is `verify` or empty (the default step). Add import for `MdVerifiedUser` and `MdAccountBalance` (which are already imported on lines 4-9).
  
  ```tsx
  if (step === "verify" || !step) {
    return (
      <Instruction.Panel>
        <Instruction.Badge
          icon={
            <MdVerifiedUser size={18} style={{ color: "var(--color-button)" }} />
          }
        >
          본인 확인
        </Instruction.Badge>
        <Instruction.Title
          as="h1"
          style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
        >
          안전한 금융 거래를 위해
          <br />
          본인 확인을 해주세요
        </Instruction.Title>

        <Instruction.InfoBox
          title={"왜 본인 확인이 필요한가요?"}
          icon={
            <MdAccountBalance
              size={24}
              style={{ color: "var(--color-button)" }}
            />
          }
        >
          <Text as="p" variant="body" color={"text"}>
            비대면 금융 거래의 안전성을 높이고, 타인의 계정 도용을 방지하기 위해 금융 보안 규정에 따른 본인 확인 절차가 필수적입니다.
          </Text>
        </Instruction.InfoBox>

        <Instruction.Box>
          <Instruction.Title
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <MdVerifiedUser size={20} style={{ color: "var(--color-button)" }} />
            진행 단계
          </Instruction.Title>
          <Instruction.List activeStep={1}>
            <Instruction.Item step={1}>
              <strong>본인확인:</strong> 휴대폰 인증을 통해 실명 검증을 완료합니다. (화면에서 빛나고 있는 <strong>휴대폰 인증</strong>을 선택해 주세요.)
            </Instruction.Item>
            <Instruction.Item step={2}>
              <strong>로그인 방식 선택:</strong> PIN 또는 이메일 로그인 수단을 설정합니다.
            </Instruction.Item>
            <Instruction.Item step={3}>
              <strong>서비스 이용 시작:</strong> 안전하게 금융 서비스를 이용할 수 있습니다.
            </Instruction.Item>
          </Instruction.List>
        </Instruction.Box>
      </Instruction.Panel>
    );
  }
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add frontend/src/app/login/page.tsx
  git commit -m "feat(login): implement left panel guide for verify step"
  ```

---

### Task 3: Login Content Container Update
**Files:**
* Modify: [LoginContentContainer.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/LoginContentContainer/LoginContentContainer.tsx)

- [ ] **Step 1: Map `verify` step and render `VerifyStep`**
  Map `step` query parameter to `"verify"` method, and render `<VerifyStep />` when `currentStepId` is `"verify"`. Import `VerifyStep` from `../VerifyStep/VerifyStep`.
  
  ```tsx
  // Map step to method
  const method: LoginFunnelData["method"] =
    step === "email-input"
      ? "email"
      : step === "pin-input"
      ? "pin"
      : step === "verify" || !step
      ? "verify"
      : "default";
  ```
  And render:
  ```tsx
  {currentStepId === "verify" && <VerifyStep />}
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add frontend/src/app/login/LoginContentContainer/LoginContentContainer.tsx
  git commit -m "feat(login): integrate VerifyStep into LoginContentContainer"
  ```

---

### Task 4: Create VerifyStep Component
**Files:**
* Create: [VerifyStep.css.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/VerifyStep/VerifyStep.css.ts)
* Create: [VerifyStep.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/login/VerifyStep/VerifyStep.tsx)

- [ ] **Step 1: Write `VerifyStep.css.ts`**
  Create the Vanilla-Extract styles for the new verify step.
  
  ```typescript
  import { style } from "@vanilla-extract/css";
  import { vars } from "@internal/design-system/style";

  export const phoneContentLayout = style({
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    paddingTop: "48px",
    height: "100%",
    boxSizing: "border-box",
    justifyContent: "space-between",
    gap: "24px",
    width: "100%",
  });

  export const phoneTitle = style({
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.25",
    color: vars.color.button,
    letterSpacing: "-0.01em",
    textAlign: "left",
  });

  export const phoneSubtitle = style({
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
    color: vars.color.descriptionText,
    textAlign: "left",
    marginTop: "8px",
    marginBottom: "32px",
  });

  export const methodButtons = style({
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  });

  export const kbButton = style({
    width: "100%",
    height: "4.5rem",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "16px 24px",
    border: `1px solid ${vars.color.border || "rgba(0, 0, 0, 0.08)"}`,
    background: vars.color.white,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
    selectors: {
      "&:hover": {
        borderColor: vars.color.button,
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      "&:active": {
        transform: "translateY(0)",
      },
    },
  });

  export const kbBadge = style({
    fontSize: "12px",
    background: "rgba(108, 62, 198, 0.08)",
    color: vars.color.button,
    padding: "3px 8px",
    borderRadius: "6px",
    fontWeight: "700",
  });

  export const methodDesc = style({
    fontSize: "13px",
    color: vars.color.descriptionText,
    fontWeight: "400",
    marginTop: "4px",
  });

  export const infoText = style({
    fontSize: "12px",
    color: vars.color.descriptionText,
    textAlign: "center",
    width: "100%",
    marginTop: "auto",
    marginBottom: "16px",
  });
  ```

- [ ] **Step 2: Write `VerifyStep.tsx`**
  Implement the React component rendering the two buttons, applying `actionNextStepGlow` to the Phone Verification button, and utilizing `AlertDialog` for Kookmin certificate.
  
  ```tsx
  "use client";

  import { useRef } from "react";
  import Link from "next/link";
  import { Flex } from "@internal/design-system/primitives";
  import { Text, ThreeDButton } from "@internal/design-system/components";
  import { actionNextStepGlow } from "@internal/design-system/style";
  import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/AlertDialog";
  import { AlertCloseButton } from "../../dashboard/ui/Alert/AlertCloseButton";
  import clsx from "clsx";
  import * as styles from "./VerifyStep.css";

  export function VerifyStep() {
    const kbCertTriggerRef = useRef<HTMLButtonElement>(null);

    return (
      <div className={styles.phoneContentLayout}>
        <Flex direction="column" width="full">
          <h2 className={styles.phoneTitle}>본인 확인</h2>
          <p className={styles.phoneSubtitle}>본인 인증을 위한 수단을 선택해 주세요.</p>

          <AlertDialog defaultOpen={false}>
            <div className={styles.methodButtons}>
              {/* 국민인증서 (안내 모달 트리거) */}
              <AlertDialogTrigger
                ref={kbCertTriggerRef}
                className={styles.kbButton}
              >
                <Flex justifyContent="space-between" alignItems="center" width="full">
                  <strong style={{ fontSize: "1.1rem", color: "var(--color-text)" }}>국민인증서</strong>
                  <span className={styles.kbBadge}>안내전용</span>
                </Flex>
                <span className={styles.methodDesc}>
                  국민은행 인증서로 본인 인증 (안내 팝업 제공)
                </span>
              </AlertDialogTrigger>

              {/* 휴대폰 인증 (실제 Next Step - Glow Highlight) */}
              <ThreeDButton
                as={Link}
                href="/login?step=selection"
                highlighting={true}
                className={clsx(actionNextStepGlow)}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="center"
                  width="full"
                  style={{ padding: "0.25rem 0" }}
                >
                  <strong style={{ fontSize: "1.1rem" }}>휴대폰 인증</strong>
                  <span style={{ fontSize: "0.8rem", opacity: 0.8, fontWeight: "normal", marginTop: "0.25rem" }}>
                    휴대폰 SMS 인증을 통해 본인 확인 진행
                  </span>
                </Flex>
              </ThreeDButton>
            </div>

            {/* 국민인증서 클릭 시 표시될 모달 */}
            <AlertDialogContent>
              <Flex direction="column" alignItems="center" justifyContent="center" gap={3} style={{ padding: "1rem" }}>
                <Text as="h2" variant="title" style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  국민인증서 안내
                </Text>
                <Text
                  as="p"
                  variant="body"
                  color="descriptionText"
                  style={{ textAlign: "center", lineHeight: "1.5", fontSize: "0.9rem" }}
                >
                  현재 데모 프로젝트에서는 <strong>휴대폰 인증서</strong>를 통한 본인 확인 방법을 안내하고 있습니다.
                  <br />
                  <br />
                  확인 버튼을 누르신 후, 화면에서 반짝이고 있는 <strong>휴대폰 인증</strong> 버튼을 클릭하여 본인 확인 단계를 계속해 주세요!
                </Text>
                <Flex width="full" style={{ marginTop: "1rem" }}>
                  <AlertCloseButton />
                </Flex>
              </Flex>
            </AlertDialogContent>
          </AlertDialog>
        </Flex>

        <span className={styles.infoText}>
          본인확인 정보는 암호화되어 전송됩니다.
        </span>
      </div>
    );
  }
  ```

- [ ] **Step 3: Verify build compiles**
  Ensure the new component compiles cleanly.

- [ ] **Step 4: Commit**
  ```bash
  git add frontend/src/app/login/VerifyStep
  git commit -m "feat(login): implement VerifyStep component with glow effects and AlertDialog"
  ```

---

## Verification Plan

### Manual Verification
1. Start development server: `npm run dev` in `frontend/` directory.
2. Click "시작하기" $\rightarrow$ "/intro" $\rightarrow$ Click "인증서 발급하기" $\rightarrow$ redirects to `/login`.
3. Check the left panel guide renders the verify step instructions.
4. Check the right panel renders the device frame with "국민인증서" and "휴대폰 인증".
5. Verify "휴대폰 인증" is glowing with `actionNextStepGlow`.
6. Click "국민인증서", verify modal pops up explaining that Phone Verification should be clicked.
7. Close the modal, and click "휴대폰 인증", verify it transitions smoothly to `/login?step=selection`.
