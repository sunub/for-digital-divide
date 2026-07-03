import { Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { MdInfoOutline } from "react-icons/md";
import * as styles from "../../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

const TEST_ACCOUNTS = [
  {
    id: "hana",
    bank: "하나은행",
    holder: "김하나",
    formattedNumber: "357-910123-45607",
    plainNumber: "35791012345607",
  },
  {
    id: "kb",
    bank: "국민은행",
    holder: "이국민",
    formattedNumber: "468102-04-056789",
    plainNumber: "46810204056789",
  },
  {
    id: "ibk",
    bank: "기업은행",
    holder: "박기업",
    formattedNumber: "110-345678-02-012",
    plainNumber: "11034567802012",
  },
] as const;

export function TestAccountPanel() {
  return (
    <Flex direction="column" className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>
        <MdInfoOutline size={20} />
        테스트용 가상 계좌
      </h3>
      <Box as="ul" className={styles.stepList}>
        {TEST_ACCOUNTS.map((account) => (
          <li className={styles.stepItem} key={account.id}>
            <div className={styles.stepNumber}>✓</div>
            <Flex direction="column" gap={1}>
              <Text as="span" variant="bodyStrong">
                {account.bank} (예금주: {account.holder})
              </Text>
              <Text as="code" variant="description" color="button">
                {account.formattedNumber} 또는 {account.plainNumber}
              </Text>
            </Flex>
          </li>
        ))}
      </Box>
    </Flex>
  );
}
