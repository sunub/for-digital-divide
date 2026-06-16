import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import { MdPerson } from "react-icons/md";
import * as styles from "./IdCardIllustration.css";

export function IdCardIllustration() {
  return (
    <Flex justifyContent="center" className={styles.wrapper}>
      <div className={styles.card} aria-hidden="true">
        <div className={styles.row}>
          <div className={styles.avatar}>
            <MdPerson size={28} className={styles.avatarIcon} />
          </div>
          <div className={styles.lines}>
            <div
              className={clsx(styles.line, styles.lineStrong, styles.lineFull)}
            />
            <div className={clsx(styles.line, styles.lineTwoThirds)} />
            <div className={clsx(styles.line, styles.lineFourFifths)} />
          </div>
        </div>
        <div className={styles.chipRow}>
          <div className={styles.chipCircle} />
          <div className={styles.chipRect} />
        </div>
        <div className={styles.glow} />
      </div>
    </Flex>
  );
}
