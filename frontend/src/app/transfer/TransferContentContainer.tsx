"use client";

import { Flex } from "@internal/design-system/primitives";
import { AnimationPresenceWrapper } from "@/app/onboarding/OnboardingContentContainer/OnboardingContentContainer";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { TRANSFER_STEPS } from "./funnelConfig";
import { AmountInputStep } from "./steps/AmountInputStep";
import { ConfirmPinStep } from "./steps/ConfirmPinStep";
import { RecipientInputStep } from "./steps/RecipientInputStep";
import { RecipientSelectionStep } from "./steps/RecipientSelectionStep";
import { SuccessStep } from "./steps/SuccessStep";
import { SummaryStep } from "./steps/SummaryStep";

export function TransferContentContainer() {
  const isMounted = useIsMounted();

  const funnel = useFunnel(isMounted ? TRANSFER_STEPS : [], {});

  if (!isMounted) {
    return (
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{ width: "100%" }}
      >
        로딩 중...
      </Flex>
    );
  }

  const currentStepId = funnel.currentStepId;
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
      height={"full"}
      width={"fullCqw"}
      padding={"1rem"}
    >
      <AnimationPresenceWrapper animationKey={currentStepId}>
        {currentStepId === "recipient-selection" && (
          <RecipientSelectionStep
            onNavigateToAmountInput={() => funnel.navigateTo("amount-input")}
            onDirectInput={() => funnel.navigateTo("recipient-input")}
          />
        )}
        {currentStepId === "recipient-input" && (
          <RecipientInputStep onNext={funnel.next} />
        )}
        {currentStepId === "amount-input" && (
          <AmountInputStep onNext={funnel.next} />
        )}
        {currentStepId === "summary" && <SummaryStep onNext={funnel.next} />}
        {currentStepId === "confirm-pin" && (
          <ConfirmPinStep onNext={funnel.next} />
        )}
        {currentStepId === "success" && <SuccessStep />}
      </AnimationPresenceWrapper>
    </Flex>
  );
}
