"use client";

import { TextField } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { AtSignIcon, EyeClosedIcon, EyeIcon, KeySquare } from "lucide-react";
import { useState } from "react";
import { useEmailValidation } from "./hooks/useEmailValidation";
import { usePasswordValidation } from "./hooks/usePasswordValidation";

export function EmailAndPasswordField() {
  const [emailError, validateEmail] = useEmailValidation();
  const [passwordError, validatePassword] = usePasswordValidation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      <Flex direction="column" gap="1rem">
        <TextField
          id="register-email__input-field"
          name="email"
          labelContent="이메일을 입력해주세요"
          autoComplete="email"
          value={email}
          isError={!!emailError}
          errorMessage={emailError ?? undefined}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          leftElement={<AtSignIcon size={16} />}
        />
        <TextField
          id="register-password__input-field"
          name="password"
          type={passwordVisible ? "text" : "password"}
          labelContent="비밀번호를 입력해주세요"
          autoComplete="new-password"
          value={password}
          isError={!!passwordError}
          errorMessage={
            passwordError ??
            "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."
          }
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          leftElement={<KeySquare size={16} />}
          rightElement={
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              {passwordVisible ? (
                <EyeIcon size={16} />
              ) : (
                <EyeClosedIcon size={16} />
              )}
            </button>
          }
        />
      </Flex>
    </Flex>
  );
}
