import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function SuccessGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="인증서 발급 완료"
      badgeIcon={MdBadge}
      title={
        <>
          발급이 완료되었습니다
          <br />
          이제 간편 로그인을 설정해 주세요
        </>
      }
      description="지문 인식, PIN 번호 등 다양한 간편 로그인 방식이 있지만, 이번 단계에서는 안전한 6자리 PIN 번호를 등록합니다."
      infoItems={[
        {
          title: "왜 설정해야 하나요?",
          icon: MdInfoOutline,
          description:
            "매번 복잡한 공동인증서 비밀번호를 입력할 필요 없이, 설정한 PIN 번호 하나로 빠르고 안전하게 금융 서비스를 이용할 수 있습니다.",
        },
        {
          title: "PIN 번호란 무엇인가요?",
          icon: MdCheckCircle,
          description:
            "본인만이 알 수 있는 6자리의 숫자 비밀번호입니다. 111111과 같이 연속되거나 생년월일 등 유추하기 쉬운 번호는 피해주세요.",
        },
      ]}
      steps={[
        { content: "화면의 안내에 따라 사용할 6자리 PIN 번호를 입력합니다." },
        { content: "정확한 확인을 위해 동일한 번호를 한 번 더 입력합니다." },
        { content: "등록이 완료되면 즉시 서비스를 이용하실 수 있습니다." },
      ]}
      warnings={[
        "설정한 PIN 번호를 잊어버리면 보안을 위해 초기화 후 다시 본인 확인을 거쳐야 합니다.",
      ]}
    />
  );
}
