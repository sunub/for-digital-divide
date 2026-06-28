import { Text } from "@internal/design-system/components";
import { Box } from "@internal/design-system/primitives";

export function VerifyInfoStepHeader() {
  return (
    <Box marginBottom={6}>
      <Text as="h2" variant="title">
        본인확인을 위해
        <br />
        정보를 입력해 주세요
      </Text>
    </Box>
  );
}
