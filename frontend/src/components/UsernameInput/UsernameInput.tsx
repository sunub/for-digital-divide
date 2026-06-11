"use client";

import { Flex } from "@internal/design-system/primitives";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { TextField } from "@/components/TextField/TextField";
import { errorText } from "../EmailAndPasswordField/EmailAndPasswordField.css";
import { useUsernameValidation } from "./hooks/useUsernameValidation";

export function UsernameInput() {
  const [value, setValue] = useState("");
  const [usernameError, validateUsername] = useUsernameValidation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  const handleOnBlur = () => {
    validateUsername(value);
  };

  return (
    <Flex direction={"column"}>
      <TextField
        id="register-username"
        value={value}
        name="username"
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        isError={!usernameError}
        labelContent="사용자 이름을 입력해주세요"
        autoComplete="username"
        leftIcon={<UserIcon size={16} />}
      />
      <span className={errorText({ isVisible: usernameError != null })}>
        {usernameError ||
          "2자 이상 20자 이하의 한글 또는 영문 대소문자만 사용할 수 있습니다."}
      </span>
    </Flex>
  );
}
