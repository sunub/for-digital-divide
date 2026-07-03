"use client";

import { Flex } from "@internal/design-system/primitives";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimationPresenceWrapper } from "@/app/onboarding/OnboardingContentContainer/OnboardingContentContainer";
import type { KeypadInfo } from "@/entities/keypad/keypad.model";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { TRANSFER_STEPS } from "./funnelConfig";
import { AmountInputStep } from "./steps/AmountInputStep";
import { ConfirmPinStep } from "./steps/ConfirmPinStep";
import { RecipientInputStep } from "./steps/RecipientInputStep";
import { RecipientSelectionStep } from "./steps/RecipientSelectionStep";
import { SuccessStep } from "./steps/SuccessStep";
import { SummaryStep } from "./steps/SummaryStep";

interface TransferContentContainerProps {
  transferPinPadInfo: KeypadInfo;
}

export function TransferContentContainer({
  transferPinPadInfo,
}: TransferContentContainerProps) {
  const isMounted = useIsMounted();
  const router = useRouter();
  const showToast = useToast();
  const { sourceAccount } = useTransferStore();

  useEffect(() => {
    if (isMounted && !sourceAccount) {
      showToast(
        "error",
        "이체할 출금 계좌가 선택되지 않았습니다. 대시보드에서 다시 이체를 진행해 주세요.",
      );
      router.replace("/dashboard");
    }
  }, [isMounted, sourceAccount, router, showToast]);

  const funnel = useFunnel(isMounted ? TRANSFER_STEPS : [], {});
  const currentStepId = funnel.currentStepId;

  if (!isMounted || !sourceAccount) {
    return null;
  }

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={12}
      height={"full"}
      width={"fullCqw"}
    >
      <AnimationPresenceWrapper animationKey={currentStepId}>
        {currentStepId === "recipient-selection" && (
          <RecipientSelectionStep
            onNavigateToAmountInput={() => funnel.navigateTo("amount-input")}
            onDirectInput={() => funnel.navigateTo("recipient-input")}
          />
        )}
        {currentStepId === "recipient-input" && (
          <RecipientInputStep onNext={funnel.next} onPrev={funnel.prev} />
        )}
        {currentStepId === "amount-input" && (
          <AmountInputStep onNext={funnel.next} />
        )}
        {currentStepId === "summary" && <SummaryStep onNext={funnel.next} />}
        {currentStepId === "confirm-pin" && (
          <ConfirmPinStep onNext={funnel.next} padInfo={transferPinPadInfo} />
        )}
        {currentStepId === "success" && <SuccessStep />}
      </AnimationPresenceWrapper>
    </Flex>
  );
}
