import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as style from "./RollingNumber.css";

export function DigitDivider({
  digit,
  index,
  isValid,
  length,
}: {
  digit: string;
  index: number;
  isValid: boolean;
  length: number;
}) {
  return (
    <div
      className={style.divider({ isValid })}
      style={assignInlineVars({
        [style.rollingNumberFontsizeVar]: length > 4 ? "1.25rem" : "2rem",
      })}
      key={`rolling-number-${digit}-${index}`}
    >
      {digit}
    </div>
  );
}
