"use client";

import { useFormStatus } from "react-dom";
import type { KeypadInfo } from "@/types/keypad";
import { Numpad } from "./Numpad";
import * as style from "./PinNumpad.css";
import { PinSubmitButton } from "./PinSubmitButton";

export function PinNumpad({ padInfo }: { padInfo: KeypadInfo }) {
  const status = useFormStatus();
  const { keypad, hashes } = padInfo;

  return (
    <div id="register-pin__numpad-container" className={style.container}>
      <Numpad keypad={keypad} hashes={hashes} />
      <PinSubmitButton status={status} />
    </div>
  );
}
