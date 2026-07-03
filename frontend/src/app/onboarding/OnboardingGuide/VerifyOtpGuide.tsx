import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function VerifyOtpGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="인증 완료"
      badgeIcon={MdBadge}
      title={
        <>
          문자로 발송된
          <br />
          인증번호 6자리를 입력해 주세요
        </>
      }
      description="입력하신 휴대폰 번호로 인증번호가 발송되었습니다."
      infoItems={[
        {
          title: "인증번호가 오지 않나요?",
          icon: MdInfoOutline,
          description:
            "통신사 사정에 따라 발송이 지연될 수 있습니다. 스팸 메시지함을 확인하거나, 입력하신 정보가 맞는지 다시 한 번 확인해 주세요.",
        },
        {
          title: "시간이 초과되었다면?",
          icon: MdCheckCircle,
          description:
            "인증번호는 발송 후 3분 이내에 입력해야 합니다. 시간이 지났다면 '재요청' 버튼을 눌러주세요.",
        },
      ]}
      steps={[
        { content: "휴대폰 문자로 수신된 6자리 숫자를 확인합니다." },
        { content: "화면에 숫자를 입력하고 인증을 완료합니다." },
      ]}
      warnings={[
        "연속해서 인증번호를 잘못 입력할 경우, 안전을 위해 본인 확인이 일시적으로 제한될 수 있습니다.",
      ]}
    />
  );
}
