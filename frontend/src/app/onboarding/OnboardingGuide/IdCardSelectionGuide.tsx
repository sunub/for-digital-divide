import { MdBadge, MdCropFree, MdLightbulb } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function IdCardSelectionGuide() {
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
      description="비대면 실명 확인을 위해 준비된 신분증(주민등록증, 운전면허증, 여권)을 촬영해야 합니다."
      infoItems={[
        {
          title: "빛 반사 주의",
          icon: MdLightbulb,
          description:
            "어두운 배경에서 빛이 반사되지 않도록 촬영해 주세요. 반사가 심하면 정보 인식이 어려울 수 있습니다.",
        },
        {
          title: "정확한 영역 확인",
          icon: MdCropFree,
          description:
            "신분증 정보가 화면의 가이드 영역 안에 모두 들어오도록 맞춰주세요.",
        },
      ]}
      steps={[
        { content: "사용할 신분증 종류를 선택해 주세요." },
        { content: "원활한 촬영을 위해 카메라 접근 권한을 허용해 주세요." },
        { content: "가이드 선에 맞춰 신분증의 앞면을 선명하게 촬영합니다." },
      ]}
      warnings={[
        "훼손되거나 정보가 가려진 신분증은 인증이 반려될 수 있습니다.",
        "타인의 신분증을 도용하는 경우 법적 처벌을 받을 수 있습니다.",
      ]}
    />
  );
}
