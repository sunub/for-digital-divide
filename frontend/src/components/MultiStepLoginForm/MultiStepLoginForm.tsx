"use client";

import { BaseForm } from "@internal/design-system/primitives";
import { SubmittingStatus } from "@/app/onboarding/email-password/ui/SubmittingStatus";
import type { ActionState } from "@/app/onboarding/types";
import { useDemoLoginFlow } from "@/shared/hooks/useDemoLoginFlow";
import { SubmitButton } from "../Form/SubmitButton";
import { FormInputContainer } from "../FormInputContainer";

export function MultiStepLoginForm({
  action,
  children,
  ref,
}: {
  action: (
    state: Awaited<ActionState>,
    payload: FormData,
  ) => ActionState | Promise<ActionState>;
  children: React.ReactNode;
  ref?: React.Ref<HTMLFormElement>;
}) {
  const { actionState, status, formAction } = useDemoLoginFlow({
    action,
  });

  return (
    <BaseForm
      id={"init-username-form"}
      action={formAction}
      noValidate
      display={"flex"}
      flexDirection={"column"}
      placeContent={"center"}
      gap={3}
      ref={ref}
    >
      <FormInputContainer>{children}</FormInputContainer>

      <SubmittingStatus
        actionState={actionState}
        isSubmitting={status.isGlobalPending}
        isPending={status.isPending}
        isSeedingProgress={status.isSeeding}
      />
      <SubmitButton isPending={status.isGlobalPending} />
    </BaseForm>
  );
}
