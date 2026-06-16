import { Text } from "@internal/design-system/components";
import { MdLockPerson, MdSecurity } from "react-icons/md";
import { Instruction } from "@/components/Instruction";

export function EmailLoginGuide() {
  return (
    <Instruction.Panel>
      <Instruction.Badge
        icon={
          <MdLockPerson size={18} style={{ color: "var(--color-button)" }} />
        }
      >
        이메일 로그인
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        가입하신 정보로
        <br />
        안전하게 로그인
      </Instruction.Title>

      <Instruction.InfoBox
        title={"안전한 사용을 위한 보안 수칙"}
        icon={<MdSecurity size={24} style={{ color: "var(--color-button)" }} />}
      >
        <Text as="p" variant="body" color={"text"}>
          타인에게 비밀번호를 절대 공유하지 마시고, 도용이 의심된다면 즉시
          비밀번호를 변경해 주세요. 공용 기기에서 사용하신 후에는 개인정보
          보호를 위해 꼭 로그아웃해 주시기 바랍니다.
        </Text>
      </Instruction.InfoBox>
    </Instruction.Panel>
  );
}
