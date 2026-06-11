"use client";

import { BaseForm, Box, Flex } from "@internal/design-system/primitives";
import { useActionState, useState } from "react";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { ArrowIcon } from "@/icons";
import { useFormActionToast } from "@/shared/hooks/useFormActionToast";
import { useRedirectDashboard } from "../../hooks/useRedirectDashboard";
import type { ActionState } from "../../types";
import { useSeedingDemoData } from "../hooks/useSeedingDemoData";
import { emailPasswordLoginAction } from "../utils/emailPaswordLoginAction";
import { iconContainer } from "./Form.css";
import { SubmittingStatus } from "./SubmittingStatus";

export function Form({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeedingProgress, setIsSeedingProgress] = useState(false);
  const [isSeedingCompleted, setIsSeedingCompleted] = useState(false);
  const [actionState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(emailPasswordLoginAction, {
    status: "idle",
    payload: [""],
    currentStep: "login",
  });

  useFormActionToast(actionState, () => setIsSeedingProgress(true));
  useSeedingDemoData(isSeedingProgress, (completed) => {
    setIsSeedingProgress(false);
    setIsSeedingCompleted(completed);
  });
  useRedirectDashboard(isSeedingCompleted);

  return (
    <BaseForm
      id="init-username-form"
      action={formAction}
      noValidate
      display={"flex"}
      flexDirection={"column"}
      placeContent={"center"}
      gap={3}
    >
      <Flex flexDirection="column">
        <ArrowIconIndicator />
        {children}
      </Flex>
      <SubmittingStatus
        actionState={actionState}
        isSubmitting={isSubmitting}
        isPending={isPending}
        isSeedingProgress={isSeedingProgress}
      />
      <SubmitButton
        isPending={isPending}
        onClick={() => setIsSubmitting(true)}
      />
    </BaseForm>
  );
}

function ArrowIconIndicator() {
  return (
    <Box
      display={"flex"}
      gap={2}
      color={"button"}
      paddingBottom={2}
      className={iconContainer}
    >
      <ArrowIcon />
    </Box>
  );
}
