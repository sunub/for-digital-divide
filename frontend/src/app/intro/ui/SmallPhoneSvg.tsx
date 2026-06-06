"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { icon, layerColorsVar, screen } from "./SmallPhone.css";

const layeredShadow = (layers: number, gapX: number, gapY: number): string =>
  Array.from({ length: layers }, (_, i) => {
    const colorIndex = 83 - i * 1.45;
    const color = `oklch(${colorIndex}% 0.206 288.34 / 60%)`;
    return `${(i * gapX).toFixed(1)}rem ${(i * gapY).toFixed(1)}rem ${color}`;
  }).join(" ,");

export function SmallPhoneSvg({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 496 978"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={icon({ isOpen })}
      style={assignInlineVars({
        [layerColorsVar]: isOpen ? "" : layeredShadow(5, 0.3, 0.3),
      })}
    >
      <title>Small Phone</title>
      <path
        d="M0 49C0 21.938 21.938 0 49 0H447C474.062 0 496 21.938 496 49V929C496 956.062 474.062 978 447 978H49C21.9381 978 0 956.062 0 929V49Z"
        fill="#B6A3FF"
      />
      <path
        d="M6 50C6 25.6995 25.6995 6 50 6H446C470.301 6 490 25.6995 490 50V928C490 952.301 470.301 972 446 972H50C25.6995 972 6 952.301 6 928V50Z"
        fill="#F5F3FE"
        className={screen({ isOpen })}
      />
      <rect x="198" y="21" width="100" height="20" rx="10" fill="#DDD4FF" />
    </svg>
  );
}
