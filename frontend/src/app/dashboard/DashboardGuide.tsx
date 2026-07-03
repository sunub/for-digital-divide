import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdAccountBalanceWallet,
  MdInfoOutline,
  MdListAlt,
  MdSwapHoriz,
} from "react-icons/md";
import * as styles from "../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

export function DashboardGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdSwapHoriz size={18} />
        <span>이체 시작</span>
      </div>
      <h1 className={styles.title}>
        계좌를 확인한 뒤
        <br />
        <span className={styles.titleHighlight}>이체를 시작해 주세요</span>
      </h1>
      <p className={styles.description}>
        이 단계에서는 대시보드에서 출금 계좌를 고르고, 계좌 카드의 이체 버튼을
        눌러 송금 연습 화면으로 이동합니다.
      </p>

      <Grid className={styles.infoGrid}>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdAccountBalanceWallet size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>먼저 무엇을 확인하나요?</h3>
            <p className={styles.infoDescription}>
              대시보드의 계좌 카드에서 출금할 계좌와 잔액을 확인해 주세요.
              선택한 계좌 정보는 다음 이체 단계로 이어집니다.
            </p>
          </div>
        </Flex>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdInfoOutline size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>어디로 이동하나요?</h3>
            <p className={styles.infoDescription}>
              계좌 카드 아래의 <strong>이체</strong> 버튼을 누르면 받을 사람
              선택부터 금액 입력, 최종 확인까지 이어지는 송금 교육이 시작됩니다.
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
            <span>이체에 사용할 계좌 카드와 잔액을 먼저 확인해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>
              계좌 카드 하단의 이체 버튼을 눌러 다음 화면으로 이동해 주세요.
            </span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>
              송금 화면에서 받을 사람, 금액, 비밀번호 확인 순서대로 진행합니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
