import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function VerifySelectionGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="본인 확인 선택"
      badgeIcon={MdBadge}
      title={
        <>
          안전한 금융 거래를 위해
          <br />
          본인 확인 방식을 선택해 주세요
        </>
      }
      description="휴대폰 인증 혹은 다른 인증서를 통해 본인임을 확인합니다."
      infoItems={[
        {
          title: "왜 필요한가요?",
          icon: MdInfoOutline,
          description:
            "금융 서비스는 타인의 명의 도용을 막기 위해 본인 확인이 필수적입니다. 이 단계에서 선호하는 인증 방식을 선택하여 안전하게 진행할 수 있습니다.",
        },
        {
          title: "어떤 방식이 있나요?",
          icon: MdCheckCircle,
          description:
            "KB국민인증서, 우리WON인증서 등 기존에 발급받은 인증서를 사용하거나, 휴대폰 인증을 통해 진행할 수 있습니다.",
        },
      ]}
      steps={[
        {
          content:
            "현재 활성화된 본인 확인 방식(휴대폰 인증 등)을 선택해 주세요.",
        },
      ]}
      warnings={[
        "본인 명의가 아닌 정보로 인증을 시도할 경우 서비스 이용이 제한될 수 있습니다.",
      ]}
    />
  );
}
