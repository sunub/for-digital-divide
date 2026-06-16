import { Text } from "@internal/design-system/components";
import * as styles from "./VerifyOtpStep.css";

export function VerifyOtpStepHeader() {
  return (
    <div className={styles.headerContainer}>
      <Text as="h2" className={styles.phoneTitle}>
        문자로 받은
        <br />
        인증번호 6자리를 입력해주세요
      </Text>
    </div>
  );
}
