import { Text } from "@internal/design-system/components";
import { Box } from "@internal/design-system/primitives";
import * as styles from "./VerifyOtpStep.css";

export function VerifyOtpStepHeader() {
  return (
    <Box marginBottom={8}>
      <Text as="h2" variant={"title"} className={styles.phoneTitle}>
        문자로 받은
        <br />
        인증번호 6자리를 입력해주세요
      </Text>
    </Box>
  );
}
