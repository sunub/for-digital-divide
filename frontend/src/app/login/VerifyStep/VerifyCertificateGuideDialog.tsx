import { AlertDialogContent, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { AlertCloseButton } from "../../dashboard/ui/Alert/AlertCloseButton";
import * as styles from "./VerifyStep.css";

export function VerifyCertificateGuideDialog() {
  return (
    <AlertDialogContent>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={3}
        className={styles.dialogContent}
      >
        <Text as="h2" variant="title" className={styles.dialogTitle}>
          국민인증서 안내
        </Text>
        <Text
          as="p"
          variant="body"
          color="descriptionText"
          className={styles.dialogDescription}
        >
          현재 데모 프로젝트에서는 <strong>휴대폰 인증</strong>을 통한 본인 확인
          방법을 안내하고 있습니다.
          <br />
          <br />
          확인 버튼을 누르신 후, <strong>휴대폰 인증</strong>을 선택해 본인 확인
          단계를 계속해 주세요.
        </Text>
        <div className={styles.dialogCloseAction}>
          <AlertCloseButton />
        </div>
      </Flex>
    </AlertDialogContent>
  );
}
