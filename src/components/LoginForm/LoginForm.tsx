import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { authenticate, createUserInfo } from "@/lib/action";
import LoginInput from "./Form/LoginInput";
import LoginButton from "./Form/LoginButton";

type LoginAction = {
  type: "wrongId" | "wrongPassword" | "wrongLengthID" | "wrongLengthPassword";
};

type ErrorMessage = {
  message: string;
};

// function reducer(errorMessage: ErrorMessage, action: LoginAction) {
//   switch (action.type) {
//     case "wrongId":
//       return {
//         message: "아이디가 존재하지 않습니다.",
//       };
//     case "wrongPassword":
//       return {
//         message: "비밀번호 존재하지 않습니다.",
//       };
//     case "wrongLengthID":
//       return {
//         message: "아이디는 4자 이상 20자 이하로 입력해주세요.",
//       };
//     case "wrongLengthPassword":
//       return {
//         message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
//       };
//     default:
//       return {
//         message: "",
//       };
//   }
// }

function LoginForm({ children }: { children: React.ReactNode }) {
  return (
    <Styled.Form
      action={async (formData: FormData) => {
        "use server";
        await authenticate(formData);
      }}
      // onSubmit={async (formData: FormData) => {
      //   "use server";
      //   // e.preventDefault();
      //   // const formData = new FormData(formData);
      //   await authenticate(formData);
      // }}
    >
      <FormHeader />
      <Styled.MainWrapper>
        <LoginInput />
        {children}
      </Styled.MainWrapper>
      <Styled.FooterWrapper>
        <LoginButton />
      </Styled.FooterWrapper>
    </Styled.Form>
  );
}

export default LoginForm;
