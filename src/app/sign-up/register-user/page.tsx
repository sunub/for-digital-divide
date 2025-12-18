"use client";

import { EmailAndPasswordField } from "@/components/EmailAndPasswordField";
import { Form } from "@/components/Form/Form";
import { UsernameInput } from "@/components/UsernameInput/UsernameInput";
import { Device } from "@/shared/layout";
import { Flex } from "@/shared/ui/Flex";
import * as style from "./page.css";
import { registerUserAction } from "./utils/registerUserAction";

export default function RegisterUserNamePage() {
  return (
    <Device.frame>
      <Device.content>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="2rem"
        >
          <h1 className={style.title}>회원 가입</h1>
          <Form action={registerUserAction}>
            <UsernameInput />
            <EmailAndPasswordField />
          </Form>
        </Flex>
      </Device.content>
    </Device.frame>
  );
}
