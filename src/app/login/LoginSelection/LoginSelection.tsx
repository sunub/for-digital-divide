import { CardContainer } from "@/app/dashboard/ui/Account/ui/CardContainer";
import { AppLink, Flex, Text } from "@for-digital-divide/design-system";
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
        <AppLink href="/sign-up/register-user" variant="standout">
          회원가입
        </AppLink>
        <Text color={"standOut"} variant={"description"}>
          회원가입을 하지 않으셨다면 회원가입을 해주세요.
        </Text>
        <div className={style.signInformation}></div>
      </Flex>
    </>
  );
}
