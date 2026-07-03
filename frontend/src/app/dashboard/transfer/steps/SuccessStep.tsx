import { Button, Surface, Text } from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";
import { useTransferStore } from "@/store/transfer/transfer-store";
import * as styles from "./SuccessStep.css";

export function SuccessStep() {
  const router = useRouter();
  const { recipientName, transferAmount, resetTransfer } = useTransferStore();
  const formattedAmount = Number(transferAmount).toLocaleString();

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
      gap={6}
      padding={6}
      textAlign="center"
    >
      <Flex
        direction="column"
        width="full"
        alignItems="center"
        justifyContent="center"
        className={styles.successContent}
      >
        <Box className={styles.successIconContainer} aria-hidden="true">
          <MdCheckCircle className={styles.successIcon} />
        </Box>

        <Text as="h2" variant="title" className={styles.title}>
          이체 완료
        </Text>

        <Surface
          tone="canvas"
          elevation="none"
          borderRadius="md"
          padding={4}
          className={styles.detailCard}
        >
          <Text as="p" variant="body" className={styles.summaryText}>
            <Text as="strong" variant="bodyStrong">
              {recipientName}
            </Text>
            님에게
          </Text>
          <Text as="p" variant="hero" className={styles.amount}>
            {formattedAmount}원
          </Text>
          <Text as="p" variant="body" className={styles.summaryText}>
            을 보냈습니다.
          </Text>
          <Text
            as="p"
            variant="description"
            color="descriptionText"
            className={styles.description}
          >
            모든 교육 과정이 종료되었습니다. 이제 사이트를 종료하셔도 됩니다.
          </Text>
        </Surface>
      </Flex>

      <Box className={styles.actionFooter}>
        <Button onClick={handleFinish} variant="primary" size="wide">
          대시보드로 돌아가기
        </Button>
      </Box>
    </Flex>
  );
}
