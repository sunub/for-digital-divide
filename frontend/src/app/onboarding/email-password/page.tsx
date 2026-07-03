"use client";

import { BaseForm, Flex } from "@internal/design-system/primitives";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/app/onboarding/utils/zodResolver";
import { EmailAndPasswordField } from "@/components/EmailAndPasswordField";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { FormInputContainer } from "@/components/FormInputContainer";
import { useDemoLoginFlow } from "@/shared/hooks/useDemoLoginFlow";
import {
  type EmailPasswordLoginFormInput,
  emailPasswordLoginFormSchema,
} from "./schema";
import { MainTitle } from "./ui/MainTitle";
import { SubmittingStatus } from "./ui/SubmittingStatus";
import { emailPasswordLoginAction } from "./utils/emailPaswordLoginAction";

export default function EmailPasswordLogin() {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<EmailPasswordLoginFormInput>({
    resolver: zodResolver(emailPasswordLoginFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { actionState, status, formAction } =
    useDemoLoginFlow<EmailPasswordLoginFormInput>({
      action: emailPasswordLoginAction,
    });

  const onSubmit = (data: EmailPasswordLoginFormInput): void => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={"2rem"}
    >
      <MainTitle />
      <BaseForm
        id={"init-username-form"}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        display={"flex"}
        flexDirection={"column"}
        placeContent={"center"}
        gap={3}
      >
        <FormInputContainer>
          <EmailAndPasswordField
            control={control}
            hasEmailError={Boolean(errors.email)}
            hasPasswordError={Boolean(errors.password)}
          />
        </FormInputContainer>

        <SubmittingStatus
          actionState={actionState}
          isSubmitting={status.isGlobalPending}
          isPending={status.isPending}
          isSeedingProgress={status.isSeeding}
        />
        <SubmitButton isPending={status.isGlobalPending} />
      </BaseForm>
    </Flex>
  );
}
