import { Text } from "@internal/design-system/components";
import { MdDevices, MdVerifiedUser } from "react-icons/md";
import { Instruction } from "@/components/Instruction";

export function PinLoginGuide() {
  return (
    <Instruction.Panel>
      <Instruction.Badge
        icon={
          <MdVerifiedUser size={18} style={{ color: "var(--color-button)" }} />
        }
      >
        간편 PIN 로그인
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        6자리 비밀번호로
        <br />더 쉽고 빠르게
      </Instruction.Title>

      <Instruction.InfoBox
        title={"신뢰할 수 있는 기기 전용"}
        icon={<MdDevices size={24} style={{ color: "var(--color-button)" }} />}
      >
        <Text as="p" variant="body" color={"text"}>
          등록된 기기에서만 6자리 간편 비밀번호 로그인이 제공되어 해킹 및 도용
          위험을 원천 차단합니다. 5회 이상 입력 오류 시 계정 보호를 위해 이메일
          본인 확인이 필요합니다.
        </Text>
      </Instruction.InfoBox>
    </Instruction.Panel>
  );
}
