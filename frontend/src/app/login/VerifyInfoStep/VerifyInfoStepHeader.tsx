import { Text } from "@internal/design-system/components";
import * as styles from "./VerifyInfoStep.css";

export function VerifyInfoStepHeader() {
  return (
    <div style={{ marginBottom: "24px" }}>
      <Text as="h2" className={styles.phoneTitle}>
        본인확인을 위해
        <br />
        정보를 입력해 주세요
      </Text>
    </div>
  );
}
