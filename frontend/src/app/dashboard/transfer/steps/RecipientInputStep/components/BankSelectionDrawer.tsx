import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { DeviceDrawer } from "@/shared/layout/ui/DeviceDrawer";
import * as styles from "../RecipientInputStep.css";

const BANKS = ["하나은행", "국민은행", "기업은행", "농협은행"] as const;

interface BankSelectionDrawerProps {
  onSelectBank: (bank: string) => void;
}

export function BankSelectionDrawer({
  onSelectBank,
}: BankSelectionDrawerProps) {
  return (
    <DeviceDrawer>
      <Flex direction="column" gap={2} p={4}>
        <Text as="h3" variant="title" marginBottom={4} textAlign="center">
          은행 선택
        </Text>
        {BANKS.map((bank) => (
          <Button
            key={bank}
            variant="transparent"
            onClick={() => onSelectBank(bank)}
            className={styles.drawerBankButton}
          >
            {bank}
          </Button>
        ))}
      </Flex>
    </DeviceDrawer>
  );
}
