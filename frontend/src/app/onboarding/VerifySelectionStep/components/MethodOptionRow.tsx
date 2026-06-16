import { Text } from "@internal/design-system/components";
import { Box } from "@internal/design-system/primitives";
import { actionNextStepGlow, vars } from "@internal/design-system/style";
import clsx from "clsx";
import { MdChevronRight } from "react-icons/md";
import * as styles from "../VerifySelectionStep.css";

interface MethodOptionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function MethodOptionRow({
  title,
  className,
  ...props
}: MethodOptionRowProps) {
  return (
    <Box
      asChild
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      className={actionNextStepGlow}
      padding={4}
      borderRadius="md"
      backgroundColor="white"
    >
      <div className={clsx(styles.methodRow, className)} {...props}>
        <Text as="span" variant="body" fontWeight="semibold" color="text">
          {title}
        </Text>
        <MdChevronRight
          size={20}
          style={{ opacity: 0.5, color: vars.color.text }}
        />
      </div>
    </Box>
  );
}
