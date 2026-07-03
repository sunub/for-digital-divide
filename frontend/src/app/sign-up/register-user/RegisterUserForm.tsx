"use client";

import { Flex } from "@internal/design-system/primitives";
import { EmailAndPasswordField } from "@/components/EmailAndPasswordField";
import { UsernameInput } from "@/components/UsernameInput/UsernameInput";
import * as style from "./page.css";
import { registerUser } from "./utils/registerUserAction";
import { formSchema, FormInput } from "./types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/app/onboarding/utils/zodResolver";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { FormInputContainer } from "@/components/FormInputContainer";

interface RegisterUserFormProps {
  redirectTo?: string;
}

export function RegisterUserForm({ redirectTo }: RegisterUserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormInput) => {
    const result = await registerUser(data, redirectTo);
    if (result && !result.success) {
      alert(result.error);
    }
  };

  const hasUsernameError = Boolean(errors.username);
  const hasEmailError = Boolean(errors.email);
  const hasPasswordError = Boolean(errors.password);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="2rem"
      width={"full"}
      style={{
        padding: "24px",
        paddingTop: "48px",
        boxSizing: "border-box",
      }}
    >
      <h1
        className={style.phoneTitle}
        style={{ textAlign: "center", width: "100%" }}
      >
        회원 가입
      </h1>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        className={style.signupUserForm}
      >
        {redirectTo ? (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        ) : null}

        <FormInputContainer>
          <UsernameInput control={control} hasError={hasUsernameError} />
          <EmailAndPasswordField
            control={control}
            hasEmailError={hasEmailError}
            hasPasswordError={hasPasswordError}
          />
        </FormInputContainer>

        <SubmitButton isPending={isSubmitting} />
      </Flex>
    </Flex>
  );
}
