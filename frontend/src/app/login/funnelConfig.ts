import type { StepConfig } from "@/shared/hooks/useFunnel/types";

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
