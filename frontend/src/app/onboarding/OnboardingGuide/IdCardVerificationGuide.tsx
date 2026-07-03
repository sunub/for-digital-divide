import { MdBadge, MdCropFree, MdLightbulb } from "react-icons/md";
import * as styles from "./IdCardVerificationGuide.css";

export function IdCardVerificationGuide() {
  return (
    <div className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>신분증 인증</span>
      </div>
      <h1 className={styles.title}>
        안전한 금융 거래를 위해
        <br />
        <span className={styles.titleHighlight}>신분증 확인이 필요합니다</span>
      </h1>
      <p className={styles.description}>
        주민등록증, 운전면허증 또는 여권을 준비해 주세요.
      </p>
      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <div className={styles.infoIconContainer}>
            <MdLightbulb size={24} />
          </div>
          <div>
            <h3 className={styles.infoTitle}>빛 반사 주의</h3>
            <p className={styles.infoDescription}>
              어두운 배경에서 빛이 반사되지 않도록 촬영해 주세요.
            </p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoIconContainer}>
            <MdCropFree size={24} />
          </div>
          <div>
            <h3 className={styles.infoTitle}>정확한 영역 확인</h3>
            <p className={styles.infoDescription}>
              신분증 정보가 화면 영역 안에 모두 들어오도록 맞춰주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
