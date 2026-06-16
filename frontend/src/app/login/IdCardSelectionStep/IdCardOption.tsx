import { Text } from "@internal/design-system/components";
import { RadioCard } from "@/components/RadioCard";
import * as styles from "./IdCardSelectionStep.css";

interface IdCardOptionProps {
  value: "resident" | "driver" | "passport";
  currentValue: "resident" | "driver" | "passport" | null;
  onChange: (value: "resident" | "driver" | "passport") => void;
  label: string;
  disabled?: boolean;
}

export function IdCardOption({
  value,
  currentValue,
  onChange,
  label,
  disabled,
}: IdCardOptionProps) {
  const inputId = `id-card-option-${value}`;

  const content = (
    <RadioCard
      id={inputId}
      name="id_type"
      value={value}
      checked={currentValue === value}
      onChange={() => onChange(value)}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled ? true : undefined}
    >
      <Text as="span" variant="bodyStrong">
        {label}
      </Text>
    </RadioCard>
  );

  if (disabled) {
    return <span className={styles.disabledOptionTrigger}>{content}</span>;
  }

  return content;
}
