"use client";

import {
  Button,
  useAlertDialogContext,
} from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { actionNextStepGlow } from "@internal/design-system/style";
import clsx from "clsx";
import { type ChangeEventHandler, type FormEvent, useCallback } from "react";
import { VerifyMethodOptionField } from "./VerifyMethodOptionField";
import * as styles from "./VerifyStep.css";
import {
  VERIFY_METHOD_FIELD_NAME,
  VERIFY_METHOD_IDS,
  type VerifyMethod,
} from "./VerifyStep.types";

interface VerifyMethodSelectionFormProps {
  selectedMethod: VerifyMethod;
  onMethodChange: ChangeEventHandler<HTMLInputElement>;
  onSubmitPhoneMethod: () => void;
}

export function VerifyMethodSelectionForm({
  selectedMethod,
  onMethodChange,
  onSubmitPhoneMethod,
}: VerifyMethodSelectionFormProps) {
  const alertDialog = useAlertDialogContext();

  const openGuideDialog = useCallback(() => {
    if (!alertDialog.open) {
      alertDialog.onOpenToggle();
    }
  }, [alertDialog]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (selectedMethod === "phone-sms") {
        onSubmitPhoneMethod();
        return;
      }
      openGuideDialog();
    },
    [onSubmitPhoneMethod, openGuideDialog, selectedMethod],
  );

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      direction="column"
      width="full"
      className={styles.methodForm}
    >
      <fieldset className={styles.methodFieldset}>
        <legend className={styles.srOnly}>본인 인증 수단 선택</legend>
        <div className={styles.methodOptions}>
          <VerifyMethodOptionField
            id={VERIFY_METHOD_IDS.kbCertificate}
            name={VERIFY_METHOD_FIELD_NAME}
            value="kb-certificate"
            title="국민인증서"
            badge="안내전용"
            description="국민은행 인증서로 본인 인증 (안내 팝업 제공)"
            checked={selectedMethod === "kb-certificate"}
            onChange={onMethodChange}
          />
          <VerifyMethodOptionField
            id={VERIFY_METHOD_IDS.phoneSms}
            name={VERIFY_METHOD_FIELD_NAME}
            value="phone-sms"
            title="휴대폰 인증"
            description="휴대폰 SMS 인증을 통해 본인 확인 진행"
            checked={selectedMethod === "phone-sms"}
            onChange={onMethodChange}
          />
        </div>
      </fieldset>

      <div className={styles.actionButtons}>
        <Button
          type="button"
          variant="transparent"
          onClick={openGuideDialog}
          className={styles.guideButton}
        >
          국민인증서 안내 보기
        </Button>
        <Button
          type="submit"
          className={clsx(actionNextStepGlow, styles.submitButton)}
        >
          선택한 인증으로 계속하기
        </Button>
      </div>
    </Flex>
  );
}
