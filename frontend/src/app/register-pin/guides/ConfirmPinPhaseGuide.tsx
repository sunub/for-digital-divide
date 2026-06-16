import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

export function ConfirmPinPhaseGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>PIN 등록 2/2</span>
      </div>
      <h1 className={styles.title}>
        입력하신 비밀번호를
        <br />
        <span className={styles.titleHighlight}>다시 한번 확인합니다</span>
      </h1>
      <p className={styles.description}>
        설정 과정에서 오타가 발생하지 않도록, 방금 입력한 6자리 비밀번호를
        동일하게 한 번 더 입력해 주세요.
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
            <h3 className={styles.infoTitle}>왜 한 번 더 입력하나요?</h3>
            <p className={styles.infoDescription}>
              버튼을 잘못 눌러 원치 않는 비밀번호로 등록되는 것을 방지하기 위한
              필수 확인 절차입니다.
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
            <h3 className={styles.infoTitle}>틀리면 어떻게 되나요?</h3>
            <p className={styles.infoDescription}>
              처음 입력한 번호와 다를 경우, 다시 처음부터 PIN 번호를 설정해야 할
              수도 있으니 천천히 정확하게 입력해 주세요.
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
            <span>앞서 입력한 6자리 숫자를 다시 입력합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>일치하면 PIN 등록이 최종 완료되며 서비스로 이동합니다.</span>
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
              번호가 일치하지 않으면 등록이 완료되지 않으니 신중하게 입력해
              주세요.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
