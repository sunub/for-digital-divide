import { MdBadge, MdCropFree, MdLightbulb } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function IdCardVerificationGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="신분증 인증"
      badgeIcon={MdBadge}
      title={
        <>
          안전한 금융 거래를 위해
          <br />
          신분증 확인이 필요합니다
        </>
      }
      description="주민등록증, 운전면허증 또는 여권을 준비해 주세요."
      infoItems={[
        {
          title: "빛 반사 주의",
          icon: MdLightbulb,
          description: "어두운 배경에서 빛이 반사되지 않도록 촬영해 주세요.",
        },
        {
          title: "정확한 영역 확인",
          icon: MdCropFree,
          description:
            "신분증 정보가 화면 영역 안에 모두 들어오도록 맞춰주세요.",
        },
      ]}
    />
  );
}
