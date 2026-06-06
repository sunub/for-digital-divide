"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useEffect, useState } from "react";
import * as style from "./RollingNumber.css";

const NUMBER_SLOTS = Array.from({ length: 10 }, (_, i) => i);

export function RollingNumber({
  digit,
  length,
}: {
  digit: string;
  length: number;
}) {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const newTranslateY =
        digit.trim() === "" ? 0 : -((20 - (parseInt(digit, 10) + 1)) * 37);
      setTranslateY(newTranslateY);
    }, 0);
  }, [digit]);

  return (
    <div
      className={style.rollingNumberWrapper}
      style={{
        ...assignInlineVars({
          [style.translateYValueVar]: `translateY(${translateY}px)`,
          [style.rollingNumberFontsizeVar]: length > 4 ? "1.25rem" : "2rem",
        }),
      }}
    >
      <div className={style.number}>&nbsp;</div>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={NUMBER_SLOTS[i]} className={style.number}>
          {i}
        </div>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={NUMBER_SLOTS[i] + 10} className={style.number}>
          {8 - i}
        </div>
      ))}
      <div className={style.number}>&nbsp;</div>
    </div>
  );
}
