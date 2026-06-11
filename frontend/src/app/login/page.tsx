import { Text } from "@internal/design-system/components";
import { Grid } from "@internal/design-system/primitives";
import {
  MdAccountBalance,
  MdDevices,
  MdLockPerson,
  MdSecurity,
  MdVerifiedUser,
} from "react-icons/md";
import { Instruction } from "@/components/Instruction";
import { Device } from "@/shared/layout";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { LoginContentContainer } from "./LoginContentContainer";
import * as style from "./page.css";

function LoginGuide({ step }: { step?: string }) {
  if (step === "email-input") {
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
          icon={
            <MdSecurity size={24} style={{ color: "var(--color-button)" }} />
          }
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

  if (step === "pin-input") {
    return (
      <Instruction.Panel>
        <Instruction.Badge
          icon={
            <MdVerifiedUser
              size={18}
              style={{ color: "var(--color-button)" }}
            />
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
          icon={
            <MdDevices size={24} style={{ color: "var(--color-button)" }} />
          }
        >
          <Text as="p" variant="body" color={"text"}>
            등록된 기기에서만 6자리 간편 비밀번호 로그인이 제공되어 해킹 및 도용
            위험을 원천 차단합니다. 5회 이상 입력 오류 시 계정 보호를 위해
            이메일 본인 확인이 필요합니다.
          </Text>
        </Instruction.InfoBox>
      </Instruction.Panel>
    );
  }

  if (step === "verify" || !step) {
    return (
      <Instruction.Panel>
        <Instruction.Badge
          icon={
            <MdVerifiedUser
              size={18}
              style={{ color: "var(--color-button)" }}
            />
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
            <MdVerifiedUser
              size={20}
              style={{ color: "var(--color-button)" }}
            />
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
              <strong>서비스 이용 시작:</strong> 안전하게 금융 서비스를 이용할
              수 있습니다.
            </Instruction.Item>
          </Instruction.List>
        </Instruction.Box>
      </Instruction.Panel>
    );
  }

  // default / selection
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; reason?: string }>;
}) {
  const { reason, step } = (await searchParams) || {};
  const deviceCookie = await getPermanentCookieStorage("en_device");
  const hasPinLoginAvailable = Boolean(deviceCookie?.device_id);

  return (
    <Grid className={style.gridStyle}>
      <LoginGuide step={step} />

      <Device.Frame>
        <Device.Content>
          <LoginContentContainer
            hasPinLoginAvailable={hasPinLoginAvailable}
            reason={reason}
          />
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
