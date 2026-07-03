import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCropFree,
  MdLightbulb,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function IdCardSelectionGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
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
        비대면 실명 확인을 위해 준비된 신분증(주민등록증, 운전면허증, 여권)을
        촬영해야 합니다.
      </p>

      <Grid className={styles.infoGrid}>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdLightbulb size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>빛 반사 주의</h3>
            <p className={styles.infoDescription}>
              어두운 배경에서 빛이 반사되지 않도록 촬영해 주세요. 반사가 심하면
              정보 인식이 어려울 수 있습니다.
            </p>
          </div>
        </Flex>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdCropFree size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>정확한 영역 확인</h3>
            <p className={styles.infoDescription}>
              신분증 정보가 화면의 가이드 영역 안에 모두 들어오도록 맞춰주세요.
            </p>
          </div>
        </Flex>
      </Grid>

      <Flex direction="column" className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>
          <MdListAlt size={20} style={{ color: "#9367ef" }} />
          진행 안내
        </h3>
        <ul className={styles.stepList}>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <span>사용할 신분증 종류를 선택해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>원활한 촬영을 위해 카메라 접근 권한을 허용해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>가이드 선에 맞춰 신분증의 앞면을 선명하게 촬영합니다.</span>
          </li>
        </ul>
      </Flex>

      <Flex direction="column" className={styles.sectionContainer}>
        <ul className={styles.warningList}>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>
              훼손되거나 정보가 가려진 신분증은 인증이 반려될 수 있습니다.
            </span>
          </li>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>
              타인의 신분증을 도용하는 경우 법적 처벌을 받을 수 있습니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
