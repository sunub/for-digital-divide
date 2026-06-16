"use client";

import {
  Button,
  useAlertDialogContext,
  VisuallyHidden,
} from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { actionNextStepGlow } from "@internal/design-system/style";
import clsx from "clsx";
import { type ChangeEventHandler, type FormEvent, useCallback } from "react";
import { VerifyMethodOptionField } from "./VerifyMethodOptionField";
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
    <Flex asChild direction="column" width="full">
      <form onSubmit={handleSubmit}>
        <Box as="fieldset" margin={0} padding={0} style={{ border: "none" }}>
          <VisuallyHidden>
            <legend>본인 인증 수단 선택</legend>
          </VisuallyHidden>
          <Flex direction="column" gap={4} width="full">
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
          </Flex>
        </Box>

        <Flex direction="column" gap={3} marginTop={4}>
          <Box width="full" asChild>
            <Button
              type="button"
              variant="transparent"
              onClick={openGuideDialog}
            >
              국민인증서 안내 보기
            </Button>
          </Box>
          <Box width="full" asChild>
            <Button type="submit" className={clsx(actionNextStepGlow)}>
              선택한 인증으로 계속하기
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
}
