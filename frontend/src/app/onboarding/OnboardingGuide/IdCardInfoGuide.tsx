import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function IdCardInfoGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>정보 확인</span>
      </div>
      <h1 className={styles.title}>
        인식된 신분증 정보가
        <br />
        <span className={styles.titleHighlight}>맞는지 확인해 주세요</span>
      </h1>
      <p className={styles.description}>
        카메라가 인식한 정보가 실제 신분증 내용과 일치하는지 꼼꼼히 확인하고,
        틀린 부분을 수정해 주세요.
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
            <h3 className={styles.infoTitle}>왜 꼼꼼히 봐야 하나요?</h3>
            <p className={styles.infoDescription}>
              잘못된 정보로 인증이 접수되면, 최종 심사 과정에서 본인 확인이
              실패하여 처음부터 다시 진행해야 할 수 있습니다.
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
            <h3 className={styles.infoTitle}>수정은 어떻게 하나요?</h3>
            <p className={styles.infoDescription}>
              인식된 이름, 주민등록번호, 발급일자 등의 입력 칸을 탭하여 올바른
              정보로 직접 수정할 수 있습니다.
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
            <span>화면에 표시된 정보와 실제 신분증 내용을 비교합니다.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>
              빛 반사 등으로 잘못 인식된 글자가 있다면 직접 수정해 주세요.
            </span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>모든 정보가 정확하다면 '확인' 버튼을 눌러 제출합니다.</span>
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
              특히 발급일자(혹은 면허번호)가 정확한지 다시 한 번 확인해 주세요.
            </span>
          </li>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>
              수정이 불가능할 정도로 인식이 잘못되었다면 '다시 촬영하기'를
              권장합니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
