"use client";

import { BaseForm, type FormProps } from "@internal/design-system/primitives";
import type { Ref } from "react";
import { useActionState } from "react";
import type { ActionState } from "@/app/onboarding/types";
import { useFormActionToast } from "@/shared/hooks/useFormActionToast";
import { FormInputContainer } from "../FormInputContainer";
import { SubmitButton } from "./SubmitButton";

type CustomFormProps<State> = Omit<FormProps, "action"> & {
  ref?: Ref<HTMLFormElement>;
  action: (state: Awaited<State>, payload: FormData) => State | Promise<State>;
};

export function Form<State>({
  children,
  action,
  ref,
  ...props
}: CustomFormProps<State>) {
  const [actionState, formAction, isPending] = useActionState<State, FormData>(
    action,
    {
      status: "idle",
      payload: [""],
      currentStep: "username",
    } as unknown as Awaited<State>,
  );

  useFormActionToast(actionState as ActionState);

  return (
    <BaseForm
      id={"init-username-form"}
      ref={ref}
      action={formAction}
      flexDirection={"column"}
      placeItems={"center"}
      noValidate
      gap={4}
      {...props}
    >
      <FormInputContainer>{children}</FormInputContainer>
      <SubmitButton isPending={isPending} />
    </BaseForm>
  );
}
