import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
  MdWorkspacePremium,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function SuccessGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdWorkspacePremium size={18} />
        <span>인증서 발급 완료</span>
      </div>
      <h1 className={styles.title}>
        발급이 완료되었습니다
        <br />
        <span className={styles.titleHighlight}>
          이제 간편 로그인을 설정해 주세요
        </span>
      </h1>
      <p className={styles.description}>
        지문 인식, PIN 번호 등 다양한 간편 로그인 방식이 있지만, 이번 단계에서는
        안전한 6자리 PIN 번호를 등록합니다.
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
            <h3 className={styles.infoTitle}>왜 설정해야 하나요?</h3>
            <p className={styles.infoDescription}>
              매번 복잡한 공동인증서 비밀번호를 입력할 필요 없이, 설정한 PIN
              번호 하나로 빠르고 안전하게 금융 서비스를 이용할 수 있습니다.
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
            <h3 className={styles.infoTitle}>PIN 번호란 무엇인가요?</h3>
            <p className={styles.infoDescription}>
              본인만이 알 수 있는 6자리의 숫자 비밀번호입니다. 111111과 같이
              연속되거나 생년월일 등 유추하기 쉬운 번호는 피해주세요.
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
            <span>화면의 안내에 따라 사용할 6자리 PIN 번호를 입력합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>정확한 확인을 위해 동일한 번호를 한 번 더 입력합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>등록이 완료되면 즉시 서비스를 이용하실 수 있습니다.</span>
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
              설정한 PIN 번호를 잊어버리면 보안을 위해 초기화 후 다시 본인
              확인을 거쳐야 합니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
