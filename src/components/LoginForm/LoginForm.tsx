"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { authenticate } from "@/lib/login_action";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import InvalidMessage from "../InvalidMessage";
import useToggle from "@/hooks/use-toggle";
import { motion } from "framer-motion";

function generateErrorMsg(type: string): string {
  switch (type) {
    case "wrongId":
      return "아이디가 존재하지 않습니다.";
    case "wrongPassword":
      return "비밀번호가 틀렸습니다.";
    case "wrongLengthID":
      return "아이디는 4자 이상 20자 이하로 입력해주세요.";
    case "wrongLengthPassword":
      return "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    default:
      return "";
  }
}

function LoginForm() {
  const [isPending, togglePending] = useToggle(false);
  const portalRef = React.useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <React.Fragment>
      <Styled.Form
        action={async (formData: FormData) => {
          const username = formData.get("username") as string;
          const password = formData.get("password") as string;

          if (username.length < 4 || username.length > 20) {
            setErrorMessage(() => generateErrorMsg("wrongLengthID"));
            togglePending();
            return;
          } else if (password.length < 8 || password.length > 20) {
            setErrorMessage(() => generateErrorMsg("wrongLengthPassword"));
            togglePending();
            return;
          }

          const loginResult = await authenticate(formData);

          if (!loginResult.type) return;

          setErrorMessage(() => generateErrorMsg(loginResult.type));
          togglePending();
        }}
      >
        <FormHeader />
        <Styled.MainWrapper>
          <LoginInput />
          <div id="login-form__warning-portal" ref={portalRef} />
          <Styled.MessageWrapper>
            {isPending ? <Loading /> : null}
            {isPending ? null : <InvalidMessage message={errorMessage} />}
          </Styled.MessageWrapper>
        </Styled.MainWrapper>
        <Styled.FooterWrapper>
          <LoginButton togglePending={togglePending} />
        </Styled.FooterWrapper>
      </Styled.Form>
    </React.Fragment>
  );
}

function Loading() {
  const circles = [
    {
      cx: "10",
      cy: "15",
      r: 5,
      fill: "#8F76FF",
    },
    {
      cx: "32",
      cy: "15",
      r: 5,
      fill: "#FF7E76",
    },
    { cx: "53", cy: "15", r: 5, fill: "#8F76FF" },
    {
      cx: "72",
      cy: "15",
      r: 5,
      fill: "#98DF9F",
    },
    {
      cx: "96",
      cy: "15",
      r: 5,
      fill: "#8F76FF",
    },
  ];

  return (
    <motion.svg
      width="106"
      height="70"
      viewBox="0 0 106 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {circles.map((circle, index) => {
        const startY = 10 - 7.5;
        const endY = 7.5 + 13;

        return (
          <motion.circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill}
            initial={{ transform: `translateY(${startY}px)` }}
            animate={{ transform: `translateY(${endY}px)` }}
            transition={{
              delay: 200 * Math.sin(0.001 * index),
              duration: 10,
              type: "spring",
              damping: 9,
              stiffness: 120,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.001,
            }}
          />
        );
      })}
    </motion.svg>
  );
}

export default LoginForm;
