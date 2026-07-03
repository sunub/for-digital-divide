import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function PhoneVerificationGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="본인 확인"
      badgeIcon={MdBadge}
      title={
        <>
          안전한 금융 거래를 위해
          <br />
          본인 확인을 진행해 주세요
        </>
      }
      description="휴대폰 명의자와 입력 정보가 일치해야 다음 단계로 진행할 수 있습니다."
      infoItems={[
        {
          title: "왜 필요한가요?",
          icon: MdInfoOutline,
          description:
            "금융 서비스는 타인의 명의 도용과 무단 접근을 막기 위해 본인 확인이 필수입니다. 입력한 정보는 본인 명의 여부를 확인하고 이후 인증서 발급 및 로그인 설정에 사용됩니다.",
        },
        {
          title: "무엇을 준비해야 하나요?",
          icon: MdCheckCircle,
          description:
            "본인 명의 휴대폰, 이름, 주민등록번호, 통신사, 문자 인증번호를 받을 수 있는 상태",
        },
      ]}
      steps={[
        { content: "본인 확인 방식을 선택해 주세요." },
        {
          content:
            "이름, 주민등록번호, 통신사, 휴대폰 번호를 정확히 입력해 주세요.",
        },
        { content: "문자로 받은 인증번호를 입력하면 다음 단계로 이동합니다." },
      ]}
      warnings={[
        "입력 정보가 실제 휴대폰 명의자 정보와 다르면 인증이 실패할 수 있습니다.",
        "인증번호는 발송 후 제한 시간 안에 입력해야 합니다.",
      ]}
    />
  );
}
