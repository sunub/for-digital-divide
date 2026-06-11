"use client";

import { BaseForm, type FormProps } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { Ref } from "react";
import { SubmittingStatus } from "@/app/login/email-password/ui/SubmittingStatus";
import type { ActionState } from "@/app/login/types";
import { useNumpadStore } from "@/context/NumpadContext";
import { useDemoLoginFlow } from "@/shared/hooks/useDemoLoginFlow";
import { ContentOpener } from "@/shared/layout/ui/ContentOpener";
import { PinContent } from "../PinContent/PinContent";
import * as style from "./PinForm.css";

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

export function PinForm({
  action,
  ref,
  children,
  title,
  description,
  ...props
}: PinFormProps) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);
  const { formAction, status, actionState } = useDemoLoginFlow({
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
          isSeedingProgress={status.isSeeding}
          isSubmitting={status.isGlobalPending}
        />
      </PinContent>
      {children}
    </BaseForm>
  );
}
