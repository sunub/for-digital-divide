import { Text } from "@internal/design-system/components";
import { MdAccountBalance, MdVerifiedUser } from "react-icons/md";
import { Instruction } from "@/components/Instruction";

export function IdentityVerificationGuide() {
  return (
    <Instruction.Panel>
      <Instruction.Badge
        icon={
          <MdVerifiedUser size={18} style={{ color: "var(--color-button)" }} />
        }
      >
        본인 확인
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        안전한 금융 거래를 위해
        <br />
        본인 확인을 해주세요
      </Instruction.Title>

      <Instruction.InfoBox
        title={"왜 본인 확인이 필요한가요?"}
        icon={
          <MdAccountBalance
            size={24}
            style={{ color: "var(--color-button)" }}
          />
        }
      >
        <Text as="p" variant="body" color={"text"}>
          비대면 금융 거래의 안전성을 높이고, 타인의 계정 도용을 방지하기 위해
          금융 보안 규정에 따른 본인 확인 절차가 필수적입니다.
        </Text>
      </Instruction.InfoBox>

      <Instruction.Box>
        <Instruction.Title
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <MdVerifiedUser size={20} style={{ color: "var(--color-button)" }} />
          진행 단계
        </Instruction.Title>
        <Instruction.List activeStep={1}>
          <Instruction.Item step={1}>
            <strong>본인확인:</strong> 휴대폰 인증을 통해 실명 검증을
            완료합니다. (화면에서 빛나고 있는 <strong>휴대폰 인증</strong>을
            선택해 주세요.)
          </Instruction.Item>
          <Instruction.Item step={2}>
            <strong>로그인 방식 선택:</strong> PIN 또는 이메일 로그인 수단을
            설정합니다.
          </Instruction.Item>
          <Instruction.Item step={3}>
            <strong>서비스 이용 시작:</strong> 안전하게 금융 서비스를 이용할 수
            있습니다.
          </Instruction.Item>
        </Instruction.List>
      </Instruction.Box>
    </Instruction.Panel>
  );
}
