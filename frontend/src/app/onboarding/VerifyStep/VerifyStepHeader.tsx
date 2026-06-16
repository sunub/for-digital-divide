import { Text } from "@internal/design-system/components";

export function VerifyStepHeader() {
  return (
    <>
      <Text
        as="h2"
        fontSize="1.75rem"
        fontWeight="bold"
        color="button"
        textAlign="left"
        style={{ lineHeight: "1.25", letterSpacing: "-0.01em" }}
      >
        본인 확인
      </Text>
      <Text
        as="p"
        variant="body"
        color="descriptionText"
        marginTop={2}
        marginBottom={6}
        textAlign="left"
        style={{ fontSize: "14px", lineHeight: "1.5" }}
      >
        본인 인증을 위한 수단을 선택해 주세요.
      </Text>
    </>
  );
}
