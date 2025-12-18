import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { Box } from "@/shared/ui/Box";
import type { BaseStyle } from "@/style/sprinkles.css";
import { textFieldGroup } from "./TextFieldGroup.css";

type TextFielProps = Omit<ComponentPropsWithoutRef<"div">, keyof BaseStyle>;
interface TextFieldOwdProps extends BaseStyle, TextFielProps {}

type TextFieldStyle = Omit<BaseStyle, keyof TextFieldOwdProps>;
interface TextFieldGroupProps extends TextFieldStyle, TextFieldOwdProps {
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

export function TextFieldGroup(props: TextFieldGroupProps) {
  return <Box className={clsx(props.className, textFieldGroup)} {...props} />;
}
