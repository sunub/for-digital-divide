"use client";

import { Flex } from "@for-digital-divide/design-system";
import { AtSignIcon, KeySquare } from "lucide-react";
import { useState } from "react";
import { TextField } from "@/components/TextField/TextField";
import { TextFieldGroup } from "@/components/TextField/TextFieldGroup";
import * as style from "./EmailAndPasswordField.css";
import { useEmailValidation } from "./hooks/useEmailValidation";
import { usePasswordValidation } from "./hooks/usePasswordValidation";

export function EmailAndPasswordField() {
  const [emailError, validateEmail] = useEmailValidation();
  const [passwordError, validatePassword] = usePasswordValidation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  return (
    <Flex direction={"column"}>
      <TextFieldGroup>
        <TextField
          id="register-email__input-field"
          name="email"
          labelContent="이메일을 입력해주세요"
          autoComplete="email"
          value={email}
          isError={!emailError}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          leftIcon={<AtSignIcon size={16} />}
        />
        <TextField
          id="register-password__input-field"
          name="password"
          labelContent="비밀번호를 입력해주세요"
          autoComplete="new-password"
          value={password}
          isError={!passwordError}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          leftIcon={<KeySquare size={16} />}
          passwordVisibility={true}
        />
      </TextFieldGroup>
      <Flex direction={"column"} paddingTop={"1rem"}>
        <span className={style.errorText({ isVisible: !!passwordError })}>
          {passwordError ||
            "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."}
        </span>
        <span className={style.errorText({ isVisible: !!emailError })}>
          {emailError || "\u00A0"}
        </span>
      </Flex>
    </Flex>
  );
}
