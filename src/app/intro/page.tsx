"use client";

import { ArrowIcon } from "@/icons";
import useToggle from "@/shared/hooks/use-toggle";
import { Flex } from "@/shared/ui/Flex";
import { phoneContainer, title } from "./page.css";
import { SmallPhone } from "./ui/SmallPhone";

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width={"fullDvw"}
      height={"fullDvh"}
    >
      {!isOpen && (
        <Flex
          asChild
          direction={"column"}
          alignItems="center"
          className={title}
        >
          <header>
            <h1>핸드폰을 클릭해주세요!</h1>
            <ArrowIcon />
          </header>
        </Flex>
      )}
      <div className={phoneContainer}>
        <SmallPhone isOpen={isOpen} toggleOpen={toggleOpen} />
      </div>
    </Flex>
  );
}
