import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function VerifyOtpGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>인증 완료</span>
      </div>
      <h1 className={styles.title}>
        문자로 발송된
        <br />
        <span className={styles.titleHighlight}>
          인증번호 6자리를 입력해 주세요
        </span>
      </h1>
      <p className={styles.description}>
        입력하신 휴대폰 번호로 인증번호가 발송되었습니다.
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
            <h3 className={styles.infoTitle}>인증번호가 오지 않나요?</h3>
            <p className={styles.infoDescription}>
              통신사 사정에 따라 발송이 지연될 수 있습니다. 스팸 메시지함을
              확인하거나, 입력하신 정보가 맞는지 다시 한 번 확인해 주세요.
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
            <h3 className={styles.infoTitle}>시간이 초과되었다면?</h3>
            <p className={styles.infoDescription}>
              인증번호는 발송 후 3분 이내에 입력해야 합니다. 시간이 지났다면
              '재요청' 버튼을 눌러주세요.
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
            <span>휴대폰 문자로 수신된 6자리 숫자를 확인합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>화면에 숫자를 입력하고 인증을 완료합니다.</span>
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
              연속해서 인증번호를 잘못 입력할 경우, 안전을 위해 본인 확인이
              일시적으로 제한될 수 있습니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
