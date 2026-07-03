import { MdBadge, MdCheckCircle, MdInfoOutline } from "react-icons/md";
import { OnboardingInstructionGuide } from "./OnboardingInstructionGuide";

export function IdCardInfoGuide() {
  return (
    <OnboardingInstructionGuide
      badgeLabel="정보 확인"
      badgeIcon={MdBadge}
      title={
        <>
          인식된 신분증 정보가
          <br />
          맞는지 확인해 주세요
        </>
      }
      description="카메라가 인식한 정보가 실제 신분증 내용과 일치하는지 꼼꼼히 확인하고, 틀린 부분을 수정해 주세요."
      infoItems={[
        {
          title: "왜 꼼꼼히 봐야 하나요?",
          icon: MdInfoOutline,
          description:
            "잘못된 정보로 인증이 접수되면, 최종 심사 과정에서 본인 확인이 실패하여 처음부터 다시 진행해야 할 수 있습니다.",
        },
        {
          title: "수정은 어떻게 하나요?",
          icon: MdCheckCircle,
          description:
            "인식된 이름, 주민등록번호, 발급일자 등의 입력 칸을 탭하여 올바른 정보로 직접 수정할 수 있습니다.",
        },
      ]}
      steps={[
        { content: "화면에 표시된 정보와 실제 신분증 내용을 비교합니다." },
        {
          content:
            "빛 반사 등으로 잘못 인식된 글자가 있다면 직접 수정해 주세요.",
        },
        { content: "모든 정보가 정확하다면 '확인' 버튼을 눌러 제출합니다." },
      ]}
      warnings={[
        "특히 발급일자(혹은 면허번호)가 정확한지 다시 한 번 확인해 주세요.",
        "수정이 불가능할 정도로 인식이 잘못되었다면 '다시 촬영하기'를 권장합니다.",
      ]}
    />
  );
}
