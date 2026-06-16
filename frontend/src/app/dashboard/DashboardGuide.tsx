import { Flex, Grid } from "@internal/design-system/primitives";
import {
  MdCelebration,
  MdDashboard,
  MdInfoOutline,
  MdListAlt,
} from "react-icons/md";
import * as styles from "../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

export function DashboardGuide() {
  return (
    <Flex direction="column" className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdCelebration size={18} />
        <span>온보딩 완료</span>
      </div>
      <h1 className={styles.title}>
        모든 준비가 끝났습니다!
        <br />
        <span className={styles.titleHighlight}>
          이제 자유롭게 이용해 보세요
        </span>
      </h1>
      <p className={styles.description}>
        성공적으로 본인 확인과 인증서 발급, 로그인 설정까지 모두 마쳤습니다.
        정말 고생 많으셨습니다!
      </p>

      <Grid className={styles.infoGrid}>
        <Flex direction="column" className={styles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={styles.infoIconContainer}
          >
            <MdDashboard size={24} />
          </Flex>
          <div>
            <h3 className={styles.infoTitle}>대시보드란 무엇인가요?</h3>
            <p className={styles.infoDescription}>
              대시보드는 여러분의 금융 자산, 최근 거래 내역, 맞춤형 추천
              서비스를 한눈에 파악할 수 있는 메인 화면입니다.
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
            <h3 className={styles.infoTitle}>무엇을 할 수 있나요?</h3>
            <p className={styles.infoDescription}>
              연결된 계좌의 잔액을 확인하고, 최근 거래 내역을 살피거나 송금 및
              이체 등 다양한 뱅킹 서비스를 시작할 수 있습니다.
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
              화면을 자유롭게 둘러보며 대시보드의 기능을 체험해 보세요.
            </span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>
              더 이상 진행할 작업이 없다면 안전하게 앱을 종료하셔도 좋습니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
