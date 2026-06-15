"use client";

import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "../utils/zodResolver";
import * as styles from "./VerifyInfoStep.css";

interface StepProps {
  onNext: () => void;
}

// 1. 에러 코드 정의
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

// 2. 한글 에러 메시지 매핑
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

// 3. Zod 스키마 구현
const verifySchema = z.object({
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
  carrier: z.enum(["SKT", "KT", "LG"], {
    message: VERIFY_ERROR_CODES.CARRIER_REQUIRED,
  }),
  phone: z
    .string()
    .min(1, { message: VERIFY_ERROR_CODES.PHONE_REQUIRED })
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, {
      message: VERIFY_ERROR_CODES.PHONE_INVALID,
    }),
});

type VerifyFormData = z.infer<typeof verifySchema>;

export default function VerifyInfoStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const residentBackRef = useRef<HTMLInputElement | null>(null);

  // 전역 스토어 값을 바탕으로 초기 상태 파싱
  const defaultResident = store.verifyResidentNumber || "900101-1234567";
  const [initialFront, initialBackPart] = defaultResident.split("-");
  const initialBack = initialBackPart ? initialBackPart.charAt(0) : "1";

  const defaultCarrier = (
    store.verifyCarrier === "SKT" ||
    store.verifyCarrier === "KT" ||
    store.verifyCarrier === "LG"
      ? store.verifyCarrier
      : "SKT"
  ) as "SKT" | "KT" | "LG";

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    mode: "onChange", // 실시간 버튼 활성화를 위해 onChange 모드 적용
    defaultValues: {
      name: store.verifyName || "홍길동",
      residentFront: initialFront || "900101",
      residentBack: initialBack || "1",
      carrier: defaultCarrier,
      phone: store.verifyPhoneNumber || "010-1234-5678",
    },
  });

  // 휴대폰 번호 포매팅 헬퍼 (3-4-4 구조)
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  };

  // 성공 제출 시, 단 1회 전역 스토어 반영 후 다음 스텝 이동
  const onSubmit = (data: VerifyFormData) => {
    store.setVerifyInfo({
      verifyName: data.name,
      verifyResidentNumber: `${data.residentFront}-${data.residentBack}000000`,
      verifyCarrier: data.carrier,
      verifyPhoneNumber: data.phone,
    });
    store.setVerifyInfoSubmitted(true);
    onNext();
  };

  return (
    <div className={styles.phoneContentLayout}>
      <Flex direction="column" width="full">
        {/* 헤더 타이틀 */}
        <div style={{ marginBottom: "24px" }}>
          <Text as="h2" className={styles.phoneTitle}>
            본인확인을 위해
            <br />
            정보를 입력해 주세요
          </Text>
        </div>

        {/* 메인 폼 필드 그룹 */}
        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap="1rem"
          width="full"
          className={styles.formContainer}
        >
          {/* 이름 */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>이름</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div
                  className={clsx(
                    styles.inputWrapper,
                    errors.name &&
                      touchedFields.name &&
                      styles.inputWrapperError,
                  )}
                >
                  <input
                    {...field}
                    type="text"
                    placeholder="2자 이상 입력"
                    className={styles.inputField}
                  />
                </div>
              )}
            />
            {errors.name && touchedFields.name && (
              <span className={styles.errorText}>
                {VERIFY_ERROR_MESSAGES[errors.name.message as string] ||
                  errors.name.message}
              </span>
            )}
          </div>

          {/* 주민등록번호 */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>주민등록번호</label>
            <div
              className={clsx(
                styles.inputWrapper,
                ((errors.residentFront && touchedFields.residentFront) ||
                  (errors.residentBack && touchedFields.residentBack)) &&
                  styles.inputWrapperError,
              )}
            >
              <div className={styles.rrnSplitWrapper}>
                {/* 주민번호 앞자리 */}
                <Controller
                  name="residentFront"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={6}
                      placeholder="앞 6자리"
                      className={styles.rrnFrontField}
                      onChange={(e) => {
                        const onlyNums = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        field.onChange(onlyNums);
                        if (onlyNums.length === 6) {
                          residentBackRef.current?.focus(); // 앞자리 다 쓰면 뒷자리로 자동 포커스 점프
                        }
                      }}
                    />
                  )}
                />

                <span className={styles.rrnSeparator}>-</span>

                {/* 주민번호 뒷자리 첫 글자 */}
                <div className={styles.rrnBackFieldWrapper}>
                  <Controller
                    name="residentBack"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        maxLength={1}
                        placeholder=""
                        className={styles.rrnBackField}
                        ref={(e) => {
                          field.ref(e);
                          residentBackRef.current = e;
                        }}
                        onChange={(e) => {
                          const onlyNums = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 1);
                          field.onChange(onlyNums);
                        }}
                      />
                    )}
                  />
                  <span className={styles.rrnMask}>●●●●●●</span>
                </div>
              </div>
            </div>
            {errors.residentFront && touchedFields.residentFront && (
              <span className={styles.errorText}>
                {VERIFY_ERROR_MESSAGES[
                  errors.residentFront.message as string
                ] || errors.residentFront.message}
              </span>
            )}
            {!errors.residentFront &&
              errors.residentBack &&
              touchedFields.residentBack && (
                <span className={styles.errorText}>
                  {VERIFY_ERROR_MESSAGES[
                    errors.residentBack.message as string
                  ] || errors.residentBack.message}
                </span>
              )}
          </div>

          {/* 통신사 */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>통신사</label>
            <div
              className={clsx(
                styles.inputWrapper,
                errors.carrier &&
                  touchedFields.carrier &&
                  styles.inputWrapperError,
              )}
            >
              <div className={styles.dropdownWrapper}>
                <Controller
                  name="carrier"
                  control={control}
                  render={({ field }) => (
                    <select {...field} className={styles.selectDropdown}>
                      <option value="SKT">SKT</option>
                      <option value="KT">KT</option>
                      <option value="LG">LG U+</option>
                    </select>
                  )}
                />
              </div>
            </div>
            {errors.carrier && touchedFields.carrier && (
              <span className={styles.errorText}>
                {VERIFY_ERROR_MESSAGES[errors.carrier.message as string] ||
                  errors.carrier.message}
              </span>
            )}
          </div>

          {/* 휴대폰번호 */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>휴대폰번호</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div
                  className={clsx(
                    styles.inputWrapper,
                    errors.phone &&
                      touchedFields.phone &&
                      styles.inputWrapperError,
                  )}
                >
                  <input
                    {...field}
                    type="tel"
                    placeholder="010-0000-0000"
                    className={styles.inputField}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </div>
              )}
            />
            {errors.phone && touchedFields.phone && (
              <span className={styles.errorText}>
                {VERIFY_ERROR_MESSAGES[errors.phone.message as string] ||
                  errors.phone.message}
              </span>
            )}
          </div>

          {/* 하단 확인 버튼 */}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              disabled={!isValid}
              className={clsx(
                styles.submitButton,
                isValid
                  ? styles.submitButtonActive
                  : styles.submitButtonDisabled,
              )}
            >
              본인 정보 입력 완료
            </button>
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
