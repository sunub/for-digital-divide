"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { authenticate } from "@/lib/action";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import InvalidMessage from "../InvalidMessage";
import {
  AnimationScope,
  motion,
  easeIn,
  stagger,
  animate,
} from "framer-motion";
import styled from "styled-components";
import { useAnimate } from "framer-motion";
import Button from "../Button";
import useToggle from "@/hooks/use-toggle";
import { is } from "valibot";

const MotionSvg = styled(motion.svg)``;

const MotionCircle = styled(motion.circle)`
  transform-origin: center center;
  transform-box: view-box;
  transform: rotate(45deg);
`;

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
};

function Loading({ isPending }: { isPending: boolean }) {
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
              delay: index * 0.115,
              duration: 0.1 + index * 0.1,
              type: "spring",
              damping: 10,
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.01,
            }}
          />
        );
      })}
    </motion.svg>
  );
}

function reducer(errorMessage: ErrorMessage, action: LoginAction) {
  switch (action.type) {
    case "wrongId":
      return {
        message: "아이디가 존재하지 않습니다.",
      };
    case "wrongPassword":
      return {
        message: "비밀번호 존재하지 않습니다.",
      };
    case "wrongLengthID":
      return {
        message: "아이디는 4자 이상 20자 이하로 입력해주세요.",
      };
    case "wrongLengthPassword":
      return {
        message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
      };
    default:
      return {
        message: "",
      };
  }
}

function LoginForm() {
  const [isPending, togglePending] = useToggle(false);
  const portalRef = React.useRef<HTMLDivElement>(null);
  const [errorMessage, dispatch] = React.useReducer(reducer, {
    message: "",
  });
  return (
    <React.Fragment>
      {/* <Loading />
      <Styled.Form
        onSubmit={() => togglePending}
        action={async (formData: FormData) => {
          const username = formData.get("username") as string;
          const password = formData.get("password") as string;

          if (username.length < 4 || username.length > 20) {
            dispatch({
              type: "wrongLengthID",
            });
            return;
          } else if (password.length < 8 || password.length > 20) {
            dispatch({
              type: "wrongLengthPassword",
            });
            return;
          }

          const loginResult = await authenticate(formData).then((res) => {
            togglePending();
            return res;
          });

          if (loginResult) {
            dispatch({
              type: loginResult.type,
            });
          }
        }}
      >
        <FormHeader />
        <Styled.MainWrapper>
          <LoginInput />
          <div id="login-form__warning-portal" ref={portalRef} />
          <InvalidMessage message={errorMessage.message} />
          {isPending ? <div>loading...</div> : null}
        </Styled.MainWrapper>
        <Styled.FooterWrapper>
          <LoginButton />
        </Styled.FooterWrapper>
      </Styled.Form> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gridArea:
            "primary-nav / fullbleed-start / system-gesture / fullbleed-end",
        }}
      >
        <Button text="확인" onClick={togglePending} />
        {isPending ? <Loading isPending={isPending} /> : null}
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
