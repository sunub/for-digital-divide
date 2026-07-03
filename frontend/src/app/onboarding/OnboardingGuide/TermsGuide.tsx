import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function TermsGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="약관 동의"
      badgeIcon={MdBadge}
      title={
        <>
          서비스 이용을 위해
          <br />
          필수 약관에 동의해 주세요
        </>
      }
      description="본인 확인이 끝나면, 금융 서비스 이용과 보안 처리를 위한 약관 동의가 필요합니다."
      infoItems={[
        {
          title: "왜 필요한가요?",
          icon: MdInfoOutline,
          description:
            "약관 동의는 본인 확인 결과를 안전하게 처리하고, 인증서 발급 및 로그인 기능을 이용하기 위한 절차입니다.",
        },
        {
          title: "무엇을 확인해야 하나요?",
          icon: MdCheckCircle,
          description:
            "필수 약관, 개인정보 수집 및 이용 동의, 본인 확인 결과 활용 동의, 인증서 발급 관련 안내",
        },
      ]}
      steps={[
        { content: "필수 약관 내용을 확인해 주세요." },
        { content: "동의가 필요한 항목을 체크해 주세요." },
        { content: "동의 완료 후 다음 단계로 진행됩니다." },
      ]}
      warnings={[
        "필수 항목에 동의하지 않으면 다음 단계로 넘어갈 수 없습니다.",
        "선택 항목은 반드시 선택하지 않아도 되요! 개인정보 수집에는 동의하지 않아도 되니 원치 않으시면 건너뛰셔도 됩니다.",
      ]}
    />
  );
}
