import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function VerifyInfoGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>정보 입력</span>
      </div>
      <h1 className={styles.title}>
        정확한 본인 확인을 위해
        <br />
        <span className={styles.titleHighlight}>개인 정보를 입력해 주세요</span>
      </h1>
      <p className={styles.description}>
        이름, 주민등록번호, 통신사 및 휴대폰 번호를 정확히 입력해야 합니다.
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
            <h3 className={styles.infoTitle}>왜 이 정보가 필요한가요?</h3>
            <p className={styles.infoDescription}>
              입력하신 정보는 실제 명의자와 일치하는지 통신사를 통해 확인하는 데
              사용됩니다. 암호화되어 안전하게 처리되니 안심하셔도 됩니다.
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
            <h3 className={styles.infoTitle}>무엇을 주의해야 하나요?</h3>
            <p className={styles.infoDescription}>
              띄어쓰기 없이 정확한 이름을 입력하고, 통신사 선택 시 알뜰폰 여부를
              꼭 확인해 주세요.
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
            <span>이름과 주민등록번호 13자리를 입력합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>
              이용 중인 통신사를 선택하고 휴대폰 번호를 입력한 뒤 '인증번호
              요청'을 누릅니다.
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
              입력 정보가 실제 명의자 정보와 다르면 인증번호가 발송되지
              않습니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
