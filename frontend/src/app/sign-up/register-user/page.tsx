import { Flex, Grid, Text } from "@for-digital-divide/design-system";
import Link from "next/link";
import {
  MdAccountBalance,
  MdBadge,
  MdSecurity,
  MdVerifiedUser,
} from "react-icons/md";
import { logoutAction } from "@/app/dashboard/ui/Dashboard/utils/logoutAction";
import { EmailAndPasswordField } from "@/components/EmailAndPasswordField";
import { Form } from "@/components/Form/Form";
import { Instruction } from "@/components/Instruction";
import { UsernameInput } from "@/components/UsernameInput/UsernameInput";
import { getAuthState } from "@/entities/auth/session.server";
import { Device } from "@/shared/layout";
import * as style from "./page.css";
import { registerUserAction } from "./utils/registerUserAction";

function RegisterGuide({ hasSession }: { hasSession: boolean }) {
  if (hasSession) {
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
          이미 로그인 완료
        </Instruction.Badge>
        <Instruction.Title
          as="h1"
          style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
        >
          이미 안전하게
          <br />
          로그인되어 있습니다
        </Instruction.Title>

        <Instruction.InfoBox
          title={"지금 바로 서비스를 이용해보세요"}
          icon={
            <MdAccountBalance
              size={24}
              style={{ color: "var(--color-button)" }}
            />
          }
        >
          <Text as="p" variant="body" color={"text"}>
            현재 계정으로 로그인된 상태입니다. 대시보드로 이동하여 간편 송금 및
            자산 관리를 즉시 시작하실 수 있습니다. 혹시 새로운 다른 계정으로
            가입하시려면 아래 로그아웃을 이용해 주세요.
          </Text>
        </Instruction.InfoBox>
      </Instruction.Panel>
    );
  }

  return (
    <Instruction.Panel>
      <Instruction.Badge
        icon={<MdBadge size={18} style={{ color: "var(--color-button)" }} />}
      >
        쉬운 회원 가입
      </Instruction.Badge>
      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        안전한 금융 생활을 위한
        <br />
        첫걸음을 시작하세요
      </Instruction.Title>

      <Instruction.InfoBox
        title={"가입 시 주의 사항"}
        icon={<MdSecurity size={24} style={{ color: "var(--color-button)" }} />}
      >
        <Text as="p" variant="body" color={"text"}>
          사용자 본인의 실명(사용자 이름)을 올바르게 입력해 주세요. 이메일
          주소와 영문 대/소문자, 숫자, 특수문자가 모두 들어간 안전한 비밀번호를
          사용하여 계정을 보호하세요.
        </Text>
      </Instruction.InfoBox>
    </Instruction.Panel>
  );
}

export default async function RegisterUserNamePage() {
  const { session } = await getAuthState();
  const hasSession = Boolean(session);

  return (
    <Grid className={style.gridStyle}>
      <RegisterGuide hasSession={hasSession} />

      <Device.Frame>
        <Device.Content>
          {hasSession ? (
            <div className={style.phoneContentLayout}>
              <div>
                <h2 className={style.phoneTitle}>가입 안내</h2>
                <p className={style.phoneSubtitle}>
                  이미 가입 및 로그인이 완료된 사용자입니다.
                </p>
              </div>

              <div className={style.actionArea}>
                <Link
                  href="/dashboard"
                  style={{ width: "100%", textDecoration: "none" }}
                >
                  <button type="button" className={style.primaryButton}>
                    홈 화면(대시보드)으로 가기
                  </button>
                </Link>

                <form action={logoutAction} style={{ width: "100%" }}>
                  <button type="submit" className={style.secondaryButton}>
                    로그아웃하고 새로 가입하기
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap="2rem"
              style={{
                padding: "24px",
                paddingTop: "48px",
                boxSizing: "border-box",
              }}
            >
              <h1
                className={style.phoneTitle}
                style={{ textAlign: "center", width: "100%" }}
              >
                회원 가입
              </h1>
              <Form action={registerUserAction}>
                <UsernameInput />
                <EmailAndPasswordField />
              </Form>
            </Flex>
          )}
        </Device.Content>
      </Device.Frame>
    </Grid>
  );
}
