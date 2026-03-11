"use client";

import { Flex } from "@for-digital-divide/design-system";
import { EmailAndPasswordField } from "@/components/EmailAndPasswordField";
import { MultiStepLoginForm } from "@/components/MultiStepLoginForm/MultiStepLoginForm";
import { MainTitle } from "./ui/MainTitle";
import { emailPasswordLoginAction } from "./utils/emailPaswordLoginAction";

export default function EmailPasswordLogin() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={"2rem"}
    >
      <MainTitle />
      <MultiStepLoginForm action={emailPasswordLoginAction}>
        <EmailAndPasswordField />
      </MultiStepLoginForm>
    </Flex>
  );
}
