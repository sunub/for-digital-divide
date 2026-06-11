"use client";

import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useNumpadStore } from "@/context/NumpadContext";
import * as style from "./PinContent.css";

const PIN_LENGTH = 4;
const PIN_SLOTS = Array.from({ length: PIN_LENGTH }, (_, i) => i);

interface PinContentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  emptyCoordinateValue?: number;
}

export function PinContent({
  title,
  description,
  children,
  emptyCoordinateValue = 1000,
}: PinContentProps) {
  const pin = useNumpadStore((s) => s.numpad);

  const isFilled = ({ x, y }: { x: number; y: number }) =>
    x !== emptyCoordinateValue || y !== emptyCoordinateValue;

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      className={style.rootContainer}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={style.headerContainer}
      >
        <Text
          as="h1"
          fontSize="1.75rem"
          fontWeight="black"
          className={style.title}
        >
          {title}
        </Text>
        <Text
          as="p"
          fontSize="1rem"
          fontWeight="bold"
          marginTop="0.25rem"
          className={style.description}
        >
          {description}
        </Text>
      </Flex>

      <Flex alignItems="center" gap={2}>
        {PIN_SLOTS.map((slotIndex) => {
          const pinnumber = pin[slotIndex];
          const filled = isFilled(pinnumber);

          return (
            <span
              key={`pin-slot-${slotIndex}`}
              id={`pin-slot-${slotIndex}`}
              className={style.pointer}
            >
              <input
                name="pinnumbers"
                value={filled ? `${pinnumber.x},${pinnumber.y}` : ""}
                type="text"
                className="hidden w-0 h-0 select-none"
                readOnly
              />
              <input
                type="radio"
                name="pointer"
                checked={slotIndex === 0 ? true : filled}
                className="pin-pointer-input"
                readOnly
              />
              <input
                type="radio"
                checked={filled}
                className="pinnumber-display"
                readOnly
              />
            </span>
          );
        })}
      </Flex>

      {children}
    </Flex>
  );
}
