import { Text } from "@internal/design-system/components";
import * as styles from "./VerifyStep.css";

export function VerifyStepHeader() {
  return (
    <>
      <Text as="h2" variant="title" className={styles.phoneTitle}>
        본인 확인
      </Text>
      <Text
        as="p"
        variant="description"
        color="descriptionText"
        className={styles.phoneSubtitle}
      >
        본인 인증을 위한 수단을 선택해 주세요.
      </Text>
    </>
  );
}
