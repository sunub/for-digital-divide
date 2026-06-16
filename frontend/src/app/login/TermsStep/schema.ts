import { z } from "zod";

export const termsSchema = z.object({
  // 필수 약관
  hanaOneQApp: z.literal(true),
  donTong: z.literal(true),
  hanaCertService: z.literal(true),

  // 개인(신용)정보 수집이용제공 동의 (하나인증서 서비스)
  certUniqueIdInfo: z.literal(true),
  certPersonalInfo: z.literal(true),
  certCriticalIdInfo: z.literal(true),

  // 금융결제원 신원확인용
  thirdPartyProvisionInfo: z.literal(true),

  // 자동로그인 서비스
  autoLoginInfo: z.literal(true),
});

export type TermsSchemaType = z.infer<typeof termsSchema>;
