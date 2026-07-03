import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function TermsGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>약관 동의</span>
      </div>
      <h1 className={styles.title}>
        서비스 이용을 위해
        <br />
        <span className={styles.titleHighlight}>필수 약관에 동의해 주세요</span>
      </h1>
      <p className={styles.description}>
        본인 확인이 끝나면, 금융 서비스 이용과 보안 처리를 위한 약관 동의가
        필요합니다.
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
              약관 동의는 본인 확인 결과를 안전하게 처리하고, 인증서 발급 및
              로그인 기능을 이용하기 위한 절차입니다.
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
            <h3 className={styles.infoTitle}>무엇을 확인해야 하나요?</h3>
            <p className={styles.infoDescription}>
              필수 약관, 개인정보 수집 및 이용 동의, 본인 확인 결과 활용 동의,
              인증서 발급 관련 안내
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
            <span>필수 약관 내용을 확인해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>동의가 필요한 항목을 체크해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>동의 완료 후 다음 단계로 진행됩니다.</span>
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
              필수 항목에 동의하지 않으면 다음 단계로 넘어갈 수 없습니다.
            </span>
          </li>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>
              선택 항목은 반드시 선택하지 않아도 되요! 개인정보 수집에는
              동의하지 않아도 되니 원치 않으시면 건너뛰셔도 됩니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
