import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function VerifySelectionGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>본인 확인 선택</span>
      </div>
      <h1 className={styles.title}>
        안전한 금융 거래를 위해
        <br />
        <span className={styles.titleHighlight}>
          본인 확인 방식을 선택해 주세요
        </span>
      </h1>
      <p className={styles.description}>
        휴대폰 인증 혹은 다른 인증서를 통해 본인임을 확인합니다.
      </p>

      <Grid className={styles.infoGrid}>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdInfoOutline size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>왜 필요한가요?</h3>
            <p className={styles.infoDescription}>
              금융 서비스는 타인의 명의 도용을 막기 위해 본인 확인이
              필수적입니다. 이 단계에서 선호하는 인증 방식을 선택하여 안전하게
              진행할 수 있습니다.
            </p>
          </div>
        </Flex>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdCheckCircle size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>어떤 방식이 있나요?</h3>
            <p className={styles.infoDescription}>
              KB국민인증서, 우리WON인증서 등 기존에 발급받은 인증서를
              사용하거나, 휴대폰 인증을 통해 진행할 수 있습니다.
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
            <span>
              현재 활성화된 본인 확인 방식(휴대폰 인증 등)을 선택해 주세요.
            </span>
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
              본인 명의가 아닌 정보로 인증을 시도할 경우 서비스 이용이 제한될 수
              있습니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
