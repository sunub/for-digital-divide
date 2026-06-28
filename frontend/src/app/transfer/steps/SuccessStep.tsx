import { Button, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useRouter } from "next/navigation";
import { useTransferStore } from "@/store/transfer/transfer-store";

export function SuccessStep() {
  const router = useRouter();
  const { recipientName, transferAmount, resetTransfer } = useTransferStore();

  const handleFinish = () => {
    resetTransfer();
    router.replace("/dashboard");
  };

  return (
    <Flex
      direction="column"
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
      gap={8}
      padding={8}
      textAlign="center"
    >
      <Box fontSize="4rem">✅</Box>

      <Box>
        <Text as="h2" variant="title" marginBottom={4}>
          이체 완료
        </Text>
        <Text as="p" variant="body">
          <Text as="strong" variant="bodyStrong">
            {recipientName}
          </Text>
          님에게
          <br />
          <Text as="strong" variant="bodyStrong">
            {Number(transferAmount).toLocaleString()}원
          </Text>
          을 보냈습니다.
        </Text>
      </Box>

      <Box width="full" marginTop="auto">
        <Button onClick={handleFinish} variant="primary" size="wide">
          대시보드로 돌아가기
        </Button>
      </Box>
    </Flex>
  );
}
