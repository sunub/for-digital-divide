import { ArrowIcon } from "@/icons";
import { Flex } from "@/shared/ui/Flex";
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
