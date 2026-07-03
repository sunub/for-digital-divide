import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function VerifyInfoGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="정보 입력"
      badgeIcon={MdBadge}
      title={
        <>
          정확한 본인 확인을 위해
          <br />
          개인 정보를 입력해 주세요
        </>
      }
      description="이름, 주민등록번호, 통신사 및 휴대폰 번호를 정확히 입력해야 합니다."
      infoItems={[
        {
          title: "왜 이 정보가 필요한가요?",
          icon: MdInfoOutline,
          description:
            "입력하신 정보는 실제 명의자와 일치하는지 통신사를 통해 확인하는 데 사용됩니다. 암호화되어 안전하게 처리되니 안심하셔도 됩니다.",
        },
        {
          title: "무엇을 주의해야 하나요?",
          icon: MdCheckCircle,
          description:
            "띄어쓰기 없이 정확한 이름을 입력하고, 통신사 선택 시 알뜰폰 여부를 꼭 확인해 주세요.",
        },
      ]}
      steps={[
        { content: "이름과 주민등록번호 13자리를 입력합니다." },
        {
          content:
            "이용 중인 통신사를 선택하고 휴대폰 번호를 입력한 뒤 '인증번호 요청'을 누릅니다.",
        },
      ]}
      warnings={[
        "입력 정보가 실제 명의자 정보와 다르면 인증번호가 발송되지 않습니다.",
      ]}
    />
  );
}
