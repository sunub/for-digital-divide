import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

export function RegisterPinPhaseGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>PIN 등록 1/2</span>
      </div>
      <h1 className={styles.title}>
        안전하고 간편한
        <br />
        <span className={styles.titleHighlight}>비밀번호를 설정해 주세요</span>
      </h1>
      <p className={styles.description}>
        지문이나 얼굴 인식 외에도, 공통으로 사용할 수 있는 6자리 숫자 비밀번호를
        설정합니다.
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
            <h3 className={styles.infoTitle}>어떤 번호가 좋은가요?</h3>
            <p className={styles.infoDescription}>
              연속된 숫자(123456)나 반복되는 숫자(111111), 그리고 생년월일이나
              전화번호 등 유추하기 쉬운 번호는 피해서 안전하게 설정해 주세요.
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
            <h3 className={styles.infoTitle}>주의할 점</h3>
            <p className={styles.infoDescription}>
              입력한 번호는 기기에 안전하게 암호화되어 저장됩니다. 타인에게 절대
              노출되지 않도록 화면을 가리고 입력해 주세요.
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
              아래 화면의 키패드를 눌러 사용할 6자리 숫자를 입력합니다.
            </span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>입력이 완료되면 확인 단계로 자동으로 넘어갑니다.</span>
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
              등록된 PIN 번호를 분실하면, 보안을 위해 기존 인증 정보를 초기화한
              후 다시 등록해야 합니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
