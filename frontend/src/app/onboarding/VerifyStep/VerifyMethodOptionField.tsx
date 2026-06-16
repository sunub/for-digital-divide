import { Badge, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { vars } from "@internal/design-system/style";
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
      <Box
        asChild
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        gap={1}
        width="full"
        borderRadius="md"
        padding={4}
        paddingLeft={6}
        paddingRight={6}
        backgroundColor="white"
        style={{
          minHeight: "4.5rem",
          border: `1px solid ${vars.color.border}`,
        }}
      >
        <label
          htmlFor={id}
          className={clsx(
            styles.methodOptionLabel,
            checked ? styles.methodOptionLabelSelected : undefined,
          )}
        >
          <Flex
            width="full"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            <Text as="span" variant="bodyStrong" fontWeight="bold" color="text">
              {title}
            </Text>
            {badge ? <Badge>{badge}</Badge> : null}
          </Flex>
          <Text
            as="span"
            id={descriptionId}
            variant="description"
            color="descriptionText"
          >
            {description}
          </Text>
        </label>
      </Box>
    </div>
  );
}
