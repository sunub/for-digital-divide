"use client";

import { ThreeDButton } from "@for-digital-divide/design-system";
import { goToHome } from "@/utils/revalidate";
import * as styles from "./error.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.patternWrapper}>
        <div className={styles.card}>
          <h1 className={styles.heading}>{error.message}</h1>
          <div className={styles.detailsContainer}>
            <pre className={styles.codeBlock}>
              {error.stack?.split("\n")[0]}
            </pre>
            <p>{error.digest}</p>
          </div>
          <div className={styles.buttonGroup}>
            <ThreeDButton variant={"destructive"} onClick={() => goToHome()}>
              홈으로 돌아가기
            </ThreeDButton>
            <ThreeDButton onClick={reset}>다시 시도해주세요</ThreeDButton>
          </div>
        </div>
      </div>
    </div>
  );
}
