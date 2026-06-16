"use client";

import { Text } from "@internal/design-system/components";
import { useEffect } from "react";
import { MdSms } from "react-icons/md";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useToastStore } from "@/provider/toast/store/toast-store";
import * as styles from "@/provider/toast/style/toast.css";
import { REDIRECT_REASONS } from "@/shared/constants";

export function ToastMessage({ reason }: { reason: string }) {
  const messages: { [key: string]: string } = {
    [REDIRECT_REASONS.ALREADY_REGISTERED]:
      "이미 회원가입을 하셨습니다. 로그인해주세요.",
    [REDIRECT_REASONS.EMAIL_NOT_VERIFIED]:
      "이메일 인증이 필요합니다. 이메일을 확인해주세요.",
    [REDIRECT_REASONS.PIN_NOT_VERIFIED]:
      "핀 번호 인증이 필요합니다. 핀 번호를 확인해주세요.",
    [REDIRECT_REASONS.EXIST_DEVICE_ID]:
      "기존에 등록된 디바이스가 있습니다. PIN으로 로그인해주세요.",
  };
  const showToast = useToast();

  useEffect(() => {
    if (!reason || !messages[reason]) {
      showToast("error", "알 수 없는 이유로 로그인할 수 없습니다.", 5000);
      return;
    }
    showToast(
      "info",
      messages[reason] || "알 수 없는 이유로 로그인할 수 없습니다.",
      5000,
    );
  }, [reason, showToast, messages[reason]]);

  return null;
}

export function OtpToastMessage({ otp }: { otp: string }) {
  const dispatch = useToastStore((state) => state.dispatch);

  useEffect(() => {
    const toastId = "otp-verification-toast";
    dispatch({
      type: "info",
      payload: {
        id: toastId,
        type: "info",
        duration: 0,
        title: "메시지",
        icon: <MdSms size={24} />,
        children: (
          <Text as="p" className={styles.bodyText}>
            <span style={{ fontWeight: 700 }}>[Web발신]</span>
            <br />
            인증번호 <strong className={styles.strongOtpText}>{otp}</strong>를
            입력해주세요.
          </Text>
        ),
      },
    });

    return () => {
      dispatch({ type: "remove", payload: { id: toastId } });
    };
  }, [otp, dispatch]);

  return null;
}
