"use client";

import { cva } from "class-variance-authority";
import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import styled from "styled-components";

const inputVariants = cva("", {
  variants: {
    variant: {
      text: "",
      email: "",
    },
    size: {
      default: "h-10 px-4 py-2",
      wide: "px-24 py-5",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      pill: "px-12 py-3 leading-3",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "text",
    size: "default",
  },
});

interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

function Input(props: InputLabelProps) {
  const { htmlFor, children, ...rest } = props;
  return (
    <React.Fragment>
      <label htmlFor={htmlFor} className="flex h-fit w-fit" {...rest}>
        <h1>
          {htmlFor === "pin-pattern-input-confirm"
            ? "보안 PIN 확인"
            : "보안 PIN 등록"}
        </h1>
      </label>
      {children}
    </React.Fragment>
  );
}

Input.TextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  (props, ref) => {
    return (
      <React.Fragment>
        <div className="flex flex-row justify-around align-middle w-32 h-2"></div>
        <input ref={ref} {...props} />
      </React.Fragment>
    );
  }
);

Input.TextField.displayName = "Input TextField";

export default Input;
