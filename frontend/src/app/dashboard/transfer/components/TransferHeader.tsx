import { Button, VisuallyHidden } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { ArrowLeft } from "lucide-react";
import * as styles from "./TransferHeader.css";

export function TransferHeader({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex width="full" gap={4} justifyContent="flex-start" alignItems="center">
      <Button
        variant="transparent"
        size="icon"
        aria-label={label}
        onClick={onClick}
        className={styles.backwardButton}
      >
        <VisuallyHidden>뒤로가기 버튼</VisuallyHidden>
        <ArrowLeft size={24} />
      </Button>
      {children}
    </Flex>
  );
}
