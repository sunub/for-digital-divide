import type { ReactNode } from "react";
import {
  checkboxBox,
  checkboxWrapper,
  checkSvg,
  hiddenInput,
  labelText,
} from "./TermsCheckbox.css";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  isBold?: boolean;
}

export function TermsCheckbox({
  checked,
  onChange,
  label,
  isBold = false,
}: TermsCheckboxProps) {
  return (
    <label className={checkboxWrapper}>
      <input
        type="checkbox"
        className={hiddenInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={checkboxBox}>
        <svg
          className={checkSvg}
          viewBox="0 0 24 24"
          role="img"
          aria-label="Check mark"
        >
          <title>Check</title>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className={labelText} style={{ fontWeight: isBold ? 700 : 600 }}>
        {label}
      </span>
    </label>
  );
}
