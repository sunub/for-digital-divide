"use client";

import { ArrowIcon } from "@/icons";
import useToggle from "@/shared/hooks/use-toggle";
import { container, phoneContainer, title } from "./page.css";
import { SmallPhone } from "./ui/SmallPhone";

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div className={container}>
      {!isOpen && (
        <header className={title}>
          <h1>핸드폰을 클릭해주세요!</h1>
          <ArrowIcon />
        </header>
      )}
      <div className={phoneContainer}>
        <SmallPhone isOpen={isOpen} toggleOpen={toggleOpen} />
      </div>
    </div>
  );
}
