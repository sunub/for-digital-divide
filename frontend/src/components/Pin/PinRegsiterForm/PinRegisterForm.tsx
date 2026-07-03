"use client";

import { BaseForm, type FormProps } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { Ref } from "react";
import { SubmittingStatus } from "@/app/onboarding/email-password/ui/SubmittingStatus";
import type { ActionState } from "@/app/onboarding/types";
import { useNumpadStore } from "@/context/NumpadContext";
import { ContentOpener } from "@/shared/layout/ui/ContentOpener";
import { PinContent } from "../PinContent/PinContent";
import * as style from "../PinForm/PinForm.css";
import { useRegisterPinFlow } from "./hooks/useRegisterPinFlow";

type PinFormProps = Omit<FormProps, "action"> & {
  ref?: Ref<HTMLFormElement>;
  action: (
    state: Awaited<ActionState>,
    payload: FormData,
  ) => ActionState | Promise<ActionState>;
  children: React.ReactNode;
  title: string;
  description?: string;
  contentFooter?: React.ReactNode;
  onSuccess?: () => void | Promise<void>;
};

export function PinRegisterForm({
  action,
  ref,
  children,
  contentFooter,
  title,
  description,
  onSuccess,
  ...props
}: PinFormProps) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);
  const { formAction, status, actionState } = useRegisterPinFlow({
    action,
    onSuccess,
    onActionComplete() {
      deleteNumpad();
    },
  });

  return (
    <BaseForm
      id={"pinnumber-input"}
      ref={ref}
      action={formAction}
      className={clsx(style.form, props.className)}
      noValidate
      {...props}
    >
      <ContentOpener />
      <PinContent title={title} description={description}>
        <SubmittingStatus
          actionState={actionState}
          isPending={status.isPending}
          isSubmitting={status.isGlobalPending}
        />
        {contentFooter}
      </PinContent>
      {children}
    </BaseForm>
  );
}
