import { Flex } from "@internal/design-system/primitives";
import type { ReactNode } from "react";
import * as styles from "../../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

interface GuideInfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function GuideInfoCard({
  icon,
  title,
  description,
}: GuideInfoCardProps) {
  return (
    <Flex direction="column" className={styles.infoBox}>
      <Flex
        alignItems="center"
        justifyContent="center"
        className={styles.infoIconContainer}
      >
        {icon}
      </Flex>
      <div>
        <h3 className={styles.infoTitle}>{title}</h3>
        <p className={styles.infoDescription}>{description}</p>
      </div>
    </Flex>
  );
}
