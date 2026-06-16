"use client";

import { AlertDialog, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useCallback, useState } from "react";
import { VerifyCertificateGuideDialog } from "./VerifyCertificateGuideDialog";
import { VerifyMethodSelectionForm } from "./VerifyMethodSelectionForm";
import { isVerifyMethod, type VerifyMethod } from "./VerifyStep.types";
import { VerifyStepHeader } from "./VerifyStepHeader";

export function VerifyStep() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] =
    useState<VerifyMethod>("phone-sms");

  const handleMethodChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (isVerifyMethod(value)) {
        setSelectedMethod(value);
      }
    },
    [],
  );

  const handleSubmitPhoneMethod = useCallback(() => {
    router.push("/onboarding?step=selection");
  }, [router]);

  return (
    <Flex
      direction="column"
      paddingLeft={6}
      paddingRight={6}
      paddingTop={12}
      paddingBottom={6}
      height="full"
      justifyContent="space-between"
      gap={6}
      width="full"
      style={{ boxSizing: "border-box" }}
    >
      <Flex direction="column" width="full">
        <VerifyStepHeader />

        <AlertDialog defaultOpen={false}>
          <VerifyMethodSelectionForm
            selectedMethod={selectedMethod}
            onMethodChange={handleMethodChange}
            onSubmitPhoneMethod={handleSubmitPhoneMethod}
          />
          <VerifyCertificateGuideDialog />
        </AlertDialog>
      </Flex>

      <Text
        as="p"
        variant="description"
        color="descriptionText"
        textAlign="center"
        width="full"
        marginTop="auto"
        marginBottom={4}
      >
        본인확인 정보는 암호화되어 전송됩니다.
      </Text>
    </Flex>
  );
}
