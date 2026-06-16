import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import type { ChangeEventHandler } from "react";
import * as styles from "./VerifyStep.css";

interface VerifyMethodOptionFieldProps {
  id: string;
  name: string;
  value: string;
  title: string;
  description: string;
  badge?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function VerifyMethodOptionField({
  id,
  name,
  value,
  title,
  description,
  badge,
  checked,
  onChange,
}: VerifyMethodOptionFieldProps) {
  const descriptionId = `${id}-description`;

  return (
    <div>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={descriptionId}
        className={styles.methodOptionInput}
      />
      <label
        htmlFor={id}
        className={clsx(
          styles.methodOptionLabel,
          checked ? styles.methodOptionLabelSelected : undefined,
        )}
      >
        <Flex className={styles.methodOptionHeader}>
          <Text
            as="span"
            variant="bodyStrong"
            className={styles.methodOptionTitle}
          >
            {title}
          </Text>
          {badge ? <span className={styles.methodBadge}>{badge}</span> : null}
        </Flex>
        <Text
          as="span"
          id={descriptionId}
          variant="description"
          color="descriptionText"
          className={styles.methodOptionDescription}
        >
          {description}
        </Text>
      </label>
    </div>
  );
}
