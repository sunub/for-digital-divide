import { z } from "zod";

export const VERIFY_ERROR_CODES = {
  NAME_REQUIRED: "NAME_REQUIRED",
  NAME_INVALID_LENGTH: "NAME_INVALID_LENGTH",
  RRN_FRONT_REQUIRED: "RRN_FRONT_REQUIRED",
  RRN_FRONT_INVALID: "RRN_FRONT_INVALID",
  RRN_BACK_REQUIRED: "RRN_BACK_REQUIRED",
  RRN_BACK_INVALID: "RRN_BACK_INVALID",
  CARRIER_REQUIRED: "CARRIER_REQUIRED",
  PHONE_REQUIRED: "PHONE_REQUIRED",
  PHONE_INVALID: "PHONE_INVALID",
} as const;

export const VERIFY_ERROR_MESSAGES: Record<string, string> = {
  [VERIFY_ERROR_CODES.NAME_REQUIRED]: "이름을 입력해 주세요.",
  [VERIFY_ERROR_CODES.NAME_INVALID_LENGTH]:
    "이름은 2자 이상 20자 이하로 입력해 주세요.",
  [VERIFY_ERROR_CODES.RRN_FRONT_REQUIRED]:
    "주민등록번호 앞자리를 입력해 주세요.",
  [VERIFY_ERROR_CODES.RRN_FRONT_INVALID]: "앞자리는 숫자 6자리여야 합니다.",
  [VERIFY_ERROR_CODES.RRN_BACK_REQUIRED]:
    "주민등록번호 뒷자리를 입력해 주세요.",
  [VERIFY_ERROR_CODES.RRN_BACK_INVALID]: "뒷자리는 숫자 1자리여야 합니다.",
  [VERIFY_ERROR_CODES.CARRIER_REQUIRED]: "통신사를 선택해 주세요.",
  [VERIFY_ERROR_CODES.PHONE_REQUIRED]: "휴대폰 번호를 입력해 주세요.",
  [VERIFY_ERROR_CODES.PHONE_INVALID]:
    "3-4-4 형태의 올바른 정수여야 합니다 (예: 010-1234-5678).",
};

export const VERIFY_INFO_FIELD_IDS = {
  name: "verify-info-name",
  residentFront: "verify-info-resident-front",
  residentBack: "verify-info-resident-back",
  carrier: "verify-info-carrier",
  phone: "verify-info-phone",
} as const;

export const VERIFY_INFO_ERROR_IDS = {
  residentFront: "verify-info-resident-front-error",
  residentBack: "verify-info-resident-back-error",
  carrier: "verify-info-carrier-error",
} as const;

export const CARRIER_VALUES = ["SKT", "KT", "LG"] as const;
export type Carrier = (typeof CARRIER_VALUES)[number];

export const verifySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: VERIFY_ERROR_CODES.NAME_REQUIRED })
    .min(2, { message: VERIFY_ERROR_CODES.NAME_INVALID_LENGTH })
    .max(20, { message: VERIFY_ERROR_CODES.NAME_INVALID_LENGTH }),
  residentFront: z
    .string()
    .min(1, { message: VERIFY_ERROR_CODES.RRN_FRONT_REQUIRED })
    .regex(/^\d{6}$/, { message: VERIFY_ERROR_CODES.RRN_FRONT_INVALID }),
  residentBack: z
    .string()
    .min(1, { message: VERIFY_ERROR_CODES.RRN_BACK_REQUIRED })
    .regex(/^\d{1}$/, { message: VERIFY_ERROR_CODES.RRN_BACK_INVALID }),
  carrier: z.enum(CARRIER_VALUES, {
    message: VERIFY_ERROR_CODES.CARRIER_REQUIRED,
  }),
  phone: z
    .string()
    .min(1, { message: VERIFY_ERROR_CODES.PHONE_REQUIRED })
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
      message: VERIFY_ERROR_CODES.PHONE_INVALID,
    }),
});

export type VerifyFormData = z.infer<typeof verifySchema>;

export const isCarrierValue = (value: string): value is Carrier =>
  CARRIER_VALUES.includes(value as Carrier);

export const getVerifyErrorMessage = (
  errorCode?: string,
): string | undefined => {
  if (!errorCode) {
    return undefined;
  }

  return VERIFY_ERROR_MESSAGES[errorCode] ?? errorCode;
};

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

export const sanitizeResidentFront = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 6);

export const sanitizeResidentBack = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 1);
