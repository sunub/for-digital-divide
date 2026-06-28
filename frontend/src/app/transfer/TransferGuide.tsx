"use client";

import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { TRANSFER_STEPS } from "./funnelConfig";

export function TransferGuide({ step }: { step?: string }) {
  const isMounted = useIsMounted();
  const funnel = useFunnel(isMounted ? TRANSFER_STEPS : [], {});

  const currentStep = isMounted ? funnel.currentStepId : step;

  const renderGuideContent = () => {
    switch (currentStep) {
      case "recipient-selection":
        return (
          <>
            <h2>누구에게 보낼까요?</h2>
            <p>송금할 대상을 선택하거나 직접 계좌번호를 입력해 보세요.</p>
          </>
        );
      case "recipient-input":
        return (
          <>
            <h2>계좌번호 입력</h2>
            <p>은행을 선택하고, 정확한 계좌번호를 입력해 주세요.</p>
          </>
        );
      case "amount-input":
        return (
          <>
            <h2>금액 입력</h2>
            <p>얼마를 보낼지 숫자로 입력해 주세요.</p>
          </>
        );
      case "summary":
        return (
          <>
            <h2>최종 확인</h2>
            <p>받는 사람과 금액이 맞는지 다시 한 번 꼼꼼히 확인해 보세요.</p>
          </>
        );
      case "confirm-pin":
        return (
          <>
            <h2>비밀번호 인증</h2>
            <p>이체를 완료하기 위해 간편 비밀번호 6자리를 입력해 주세요.</p>
          </>
        );
      case "success":
        return (
          <>
            <h2>이체 완료</h2>
            <p>축하합니다! 성공적으로 이체를 완료하셨습니다.</p>
          </>
        );
      default:
        return null;
    }
  };

  return <div>{renderGuideContent()}</div>;
}
