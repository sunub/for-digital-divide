import { useEffect, useRef, useState } from "react";
import { DigitDivider } from "./DigitDivider";
import { RollingNumber } from "./RollingNumber";
import * as style from "./RollingNumber.css";

interface RollingNumberListProps {
  value: number | string;
  length: number;
  isDigitVisible?: boolean;
}

const NUM_REGEX = /[0-9]/;
function HiddenDigit() {
  return <div className={style.number}>잔액숨김</div>;
}

export function RollingNumberList({
  value,
  isDigitVisible,
  length,
}: RollingNumberListProps) {
  const digits = String(value).padStart(length, "0").split("");
  const DIGITS_SLOTS = Array.from({ length: digits.length }, (_, i) => i);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    function transitionEndHandler() {
      if (!isVisible) {
        setIsVisible(true);
      }
    }

    const wrapper = wrapperRef.current;
    wrapper.addEventListener("transitionend", transitionEndHandler);

    return () => {
      wrapper.removeEventListener("transitionend", transitionEndHandler);
    };
  }, [isVisible]);

  return (
    <div ref={wrapperRef} className={style.wrapper}>
      {isDigitVisible ? (
        <HiddenDigit />
      ) : (
        digits.map((digit, index) =>
          NUM_REGEX.test(digit) ? (
            <RollingNumber
              key={DIGITS_SLOTS[index]}
              digit={digit}
              length={digits.length}
            />
          ) : (
            <DigitDivider
              key={DIGITS_SLOTS[index]}
              digit={digit}
              index={index}
              isValid={isVisible}
              length={length}
            />
          ),
        )
      )}
    </div>
  );
}
