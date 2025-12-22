"use client";

import { useNumpadStore } from "@/context/NumpadContext";
import { Flex } from "@/shared/ui/Flex";
import * as style from "./PinContent.css";
import { headerContainer, rootContainer } from "./PinContent.css";

const PIN_LENGTH = 4;
const PIN_SLOTS = Array.from({ length: PIN_LENGTH }, (_, i) => i);

export function PinContent({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const pin = useNumpadStore((s) => s.numpad);
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      className={rootContainer}
    >
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        className={headerContainer}
      >
        <h1 className={style.title}>{title}</h1>
        <p className={style.description}>{description}</p>
      </Flex>
      <div className={style.pointerWrapper}>
        {PIN_SLOTS.map((slotIndex) => {
          const pinnumber = pin[slotIndex];
          return (
            <span
              key={`pin-slot-${slotIndex}`}
              id={`pin-slot-${slotIndex}`}
              className={style.pointer}
            >
              <input
                name="pinnumbers"
                value={
                  pinnumber.x !== 0 || pinnumber.y !== 0
                    ? `${pinnumber.x},${pinnumber.y}`
                    : ""
                }
                type="text"
                className="hidden w-0 h-0 select-none"
                readOnly
              />
              <input
                type="radio"
                name="pointer"
                checked={
                  slotIndex === 0
                    ? true
                    : pinnumber.x !== 0 || pinnumber.y !== 0
                }
                className="pin-pointer-input"
                readOnly
              />
              <input
                type="radio"
                checked={pinnumber.x !== 0 || pinnumber.y !== 0}
                className="pinnumber-display"
                readOnly
              />
            </span>
          );
        })}
      </div>
      {children}
    </Flex>
  );
}
