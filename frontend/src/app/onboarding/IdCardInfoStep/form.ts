import { z } from "zod";

export const ID_CARD_ERROR_CODES = {
  NAME_REQUIRED: "NAME_REQUIRED",
  NAME_INVALID_LENGTH: "NAME_INVALID_LENGTH",
  RRN_FRONT_REQUIRED: "RRN_FRONT_REQUIRED",
  RRN_FRONT_INVALID: "RRN_FRONT_INVALID",
  RRN_BACK_REQUIRED: "RRN_BACK_REQUIRED",
  RRN_BACK_INVALID: "RRN_BACK_INVALID",
  ISSUE_DATE_REQUIRED: "ISSUE_DATE_REQUIRED",
  ISSUE_DATE_INVALID: "ISSUE_DATE_INVALID",
} as const;

export const ID_CARD_ERROR_MESSAGES: Record<string, string> = {
  [ID_CARD_ERROR_CODES.NAME_REQUIRED]: "이름을 입력해 주세요.",
  [ID_CARD_ERROR_CODES.NAME_INVALID_LENGTH]:
    "이름은 2자 이상 20자 이하로 입력해 주세요.",
  [ID_CARD_ERROR_CODES.RRN_FRONT_REQUIRED]:
    "주민등록번호 앞자리를 입력해 주세요.",
  [ID_CARD_ERROR_CODES.RRN_FRONT_INVALID]: "앞자리는 숫자 6자리여야 합니다.",
  [ID_CARD_ERROR_CODES.RRN_BACK_REQUIRED]:
    "주민등록번호 뒷자리를 입력해 주세요.",
  [ID_CARD_ERROR_CODES.RRN_BACK_INVALID]: "뒷자리는 숫자 1자리여야 합니다.",
  [ID_CARD_ERROR_CODES.ISSUE_DATE_REQUIRED]: "발급일자를 입력해 주세요.",
  [ID_CARD_ERROR_CODES.ISSUE_DATE_INVALID]:
    "YYYY.MM.DD 형식으로 입력해 주세요.",
};

export const ID_CARD_FIELD_IDS = {
  name: "id-card-name",
  residentFront: "id-card-resident-front",
  residentBack: "id-card-resident-back",
  issueDate: "id-card-issue-date",
} as const;

export const ID_CARD_ERROR_IDS = {
  residentFront: "id-card-resident-front-error",
  residentBack: "id-card-resident-back-error",
} as const;

export const idCardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: ID_CARD_ERROR_CODES.NAME_REQUIRED })
    .min(2, { message: ID_CARD_ERROR_CODES.NAME_INVALID_LENGTH })
    .max(20, { message: ID_CARD_ERROR_CODES.NAME_INVALID_LENGTH }),
  residentFront: z
    .string()
    .min(1, { message: ID_CARD_ERROR_CODES.RRN_FRONT_REQUIRED })
    .regex(/^\d{6}$/, { message: ID_CARD_ERROR_CODES.RRN_FRONT_INVALID }),
  residentBack: z
    .string()
    .min(1, { message: ID_CARD_ERROR_CODES.RRN_BACK_REQUIRED })
    .regex(/^\d{1}$/, { message: ID_CARD_ERROR_CODES.RRN_BACK_INVALID }),
  issueDate: z
    .string()
    .min(1, { message: ID_CARD_ERROR_CODES.ISSUE_DATE_REQUIRED })
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, {
      message: ID_CARD_ERROR_CODES.ISSUE_DATE_INVALID,
    }),
});

export type IdCardFormData = z.infer<typeof idCardSchema>;

export const getIdCardErrorMessage = (
  errorCode?: string,
): string | undefined => {
  if (!errorCode) return undefined;
  return ID_CARD_ERROR_MESSAGES[errorCode] ?? errorCode;
};

export const sanitizeResidentFront = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 6);

export const sanitizeResidentBack = (value: string): string =>
  value.replace(/\D/g, "").slice(0, 1);

export const formatIssueDate = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
};
