import { Flex } from "@internal/design-system/primitives";
import { MdListAlt } from "react-icons/md";
import * as styles from "../../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

interface GuideStepItem {
  id: string;
  text: string;
}

interface GuideStepListProps {
  items: GuideStepItem[];
}

export function GuideStepList({ items }: GuideStepListProps) {
  return (
    <Flex direction="column" className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}>
        <MdListAlt size={20} />
        진행 안내
      </h3>
      <ul className={styles.stepList}>
        {items.map((item, index) => (
          <li className={styles.stepItem} key={item.id}>
            <div className={styles.stepNumber}>{index + 1}</div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </Flex>
  );
}
