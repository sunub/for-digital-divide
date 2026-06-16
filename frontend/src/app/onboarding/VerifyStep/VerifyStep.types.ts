export const VERIFY_METHOD_FIELD_NAME = "verificationMethod";

export const VERIFY_METHOD_IDS = {
  kbCertificate: "verification-method-kb-certificate",
  phoneSms: "verification-method-phone-sms",
} as const;

export const VERIFY_METHOD_VALUES = ["kb-certificate", "phone-sms"] as const;

export type VerifyMethod = (typeof VERIFY_METHOD_VALUES)[number];

export function isVerifyMethod(value: string): value is VerifyMethod {
  return VERIFY_METHOD_VALUES.includes(value as VerifyMethod);
}
