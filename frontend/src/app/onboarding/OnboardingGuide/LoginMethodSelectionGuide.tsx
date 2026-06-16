import { Text } from "@internal/design-system/components";
import { MdAccountBalance, MdDevices } from "react-icons/md";
import { Instruction } from "@/components/Instruction";

export function LoginMethodSelectionGuide() {
  return (
    <Instruction.Panel>
      <Instruction.Badge
        icon={<MdDevices size={18} style={{ color: "var(--color-button)" }} />}
      >
        쉬운 금융 로그인
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        가장 편리한 방법으로
        <br />
        로그인을 시작하세요
      </Instruction.Title>

      <Instruction.InfoBox
        title={"어떤 로그인 방법이 좋은가요?"}
        icon={
          <MdAccountBalance
            size={24}
            style={{ color: "var(--color-button)" }}
          />
        }
      >
        <Text as="p" variant="body" color={"text"}>
          자주 사용하시는 기기라면 6자리 <strong>PIN 로그인</strong>을 등록하여
          더 편리하게 거래하실 수 있습니다. 처음 접속하셨거나 다른 기기라면{" "}
          <strong>이메일 로그인</strong>을 이용해 주세요.
        </Text>
      </Instruction.InfoBox>
    </Instruction.Panel>
  );
}
