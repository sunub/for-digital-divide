import { Flex } from "@for-digital-divide/design-system";
import { ArrowIcon } from "@/icons";
import * as style from "./FormInputContainer.css";

function ArrowIconIndicator() {
  return (
    <div className={style.iconContainer}>
      <ArrowIcon />
    </div>
  );
}

export function FormInputContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      className={style.inputContainer}
    >
      <ArrowIconIndicator />
      {children}
    </Flex>
  );
}
