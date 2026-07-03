import { AppLink, Text } from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { EmailCard } from "../ui/EmailCard";
import { PinNumberCard } from "../ui/PinNumberCard";

const titleStyle = {
  fontFamily: "var(--gugi-font-family)",
} as const;

const loginMethodGridStyle = {
  gridTemplateColumns: "repeat(2, 1fr)",
} as const;

export function LoginSelection() {
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="3rem"
      >
        <Text
          as="h1"
          fontSize="3rem"
          fontWeight="semibold"
          color="button"
          style={titleStyle}
        >
          로그인
        </Text>
        <Text as="p" color="standOut">
          로그인 방식을 선택해주세요
        </Text>
      </Flex>

      <Grid gap={8} padding={8} style={loginMethodGridStyle}>
        <EmailCard href="/onboarding/login-selection?method=email&step=register" />
        <PinNumberCard href="/onboarding/login-selection?method=pin&step=register" />
      </Grid>
    </>
  );
}
