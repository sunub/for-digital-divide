import { Flex } from "@internal/design-system/primitives";
import { MdWarningAmber } from "react-icons/md";
import * as styles from "../../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

interface GuideWarningItem {
  id: string;
  text: string;
}

interface GuideWarningListProps {
  items: GuideWarningItem[];
}

export function GuideWarningList({ items }: GuideWarningListProps) {
  return (
    <Flex direction="column" className={styles.sectionContainer}>
      <ul className={styles.warningList}>
        {items.map((item) => (
          <li className={styles.warningItem} key={item.id}>
            <MdWarningAmber size={16} />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
