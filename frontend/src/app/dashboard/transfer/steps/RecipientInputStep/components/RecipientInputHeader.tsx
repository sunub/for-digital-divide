import { Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";

export function RecipientInputHeader() {
  return (
    <Flex direction="column" gap={2}>
      <Text as="h2" variant="title">
        이체할 계좌를 입력해 주세요.
      </Text>
    </Flex>
  );
}
