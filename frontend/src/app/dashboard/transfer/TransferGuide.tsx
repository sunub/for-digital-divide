"use client";

import { Flex } from "@internal/design-system/primitives";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import * as styles from "../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";
import { TRANSFER_STEPS } from "./funnelConfig";
import { TRANSFER_GUIDE_CONTENT } from "./TransferGuideParts/guideContentData";
import { TransferGuideContent } from "./TransferGuideParts/TransferGuideContent";

interface TransferGuideProps {
  step?: string;
}

export function TransferGuide({ step }: TransferGuideProps) {
  const isMounted = useIsMounted();
  const funnel = useFunnel(isMounted ? TRANSFER_STEPS : [], {});
  const currentStep = isMounted ? funnel.currentStepId : step;
  const content = currentStep ? TRANSFER_GUIDE_CONTENT[currentStep] : undefined;

  if (!content) {
    return null;
  }

  return (
    <Flex direction="column" className={styles.panelContainer}>
      <TransferGuideContent content={content} />
    </Flex>
  );
}
