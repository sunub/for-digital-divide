import Link from "next/link";
import { CardContainer } from "@/app/dashboard/ui/Account/ui/CardContainer";
import { Flex } from "@/shared/ui/Flex";
import { EmailCard } from "../ui/EmailCard";
import { PinNumberCard } from "../ui/PinNumberCard";
import * as style from "./LoginSelection.css";

export function LoginSelection() {
  return (
    <>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"3rem"}
      >
        <h1 className={style.title}>로그인</h1>
        <p className={style.description}>로그인 방식을 선택해주세요</p>
      </Flex>
      <CardContainer className={style.cardContainer}>
        <EmailCard />
        <PinNumberCard />
      </CardContainer>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
      >
        <Link href="/sign-up/register-user" className={style.signLink}>
          <span>회원가입</span>
        </Link>
        <div className={style.signInformation}>
          회원가입을 하지 않으셨다면 회원가입을 해주세요.
        </div>
      </Flex>
    </>
  );
}
