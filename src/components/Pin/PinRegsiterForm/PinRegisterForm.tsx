"use client";

import clsx from "clsx";
import type { Ref } from "react";
import { SubmittingStatus } from "@/app/login/email-password/ui/SubmittingStatus";
import { PinContent } from "@/app/login/Pin/ui/PinContent";
import type { ActionState } from "@/app/login/types";
import { useNumpadStore } from "@/context/NumpadContext";
import { ContentOpener } from "@/shared/layout/ui/ContentOpener";
import type { FormProps } from "@/shared/ui/BaseForm";
import { BaseForm } from "@/shared/ui/BaseForm";
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
};

export function PinRegisterForm({
  action,
  ref,
  children,
  title,
  description,
  ...props
}: PinFormProps) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);
  const { formAction, status, actionState } = useRegisterPinFlow({
    action,
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
      </PinContent>
      {children}
    </BaseForm>
  );
}
