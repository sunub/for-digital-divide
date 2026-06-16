import {
  MdBadge,
  MdCheckCircle,
  MdInfoOutline,
  MdListAlt,
  MdWarningAmber,
} from "react-icons/md";
import * as styles from "./PhoneVerificationGuide.css";

export function PhoneVerificationGuide() {
  return (
    <div className={styles.panelContainer}>
      <div className={styles.badge}>
        <MdBadge size={18} />
        <span>본인 확인</span>
      </div>
      <h1 className={styles.title}>
        안전한 금융 거래를 위해
        <br />
        <span className={styles.titleHighlight}>본인 확인을 진행해 주세요</span>
      </h1>
      <p className={styles.description}>
        휴대폰 명의자와 입력 정보가 일치해야 다음 단계로 진행할 수 있습니다.
      </p>

      <div className={styles.infoGrid}>
        <div className={styles.infoBox}>
          <div className={styles.infoIconContainer}>
            <MdInfoOutline size={24} />
          </div>
          <div>
            <h3 className={styles.infoTitle}>왜 필요한가요?</h3>
            <p className={styles.infoDescription}>
              금융 서비스는 타인의 명의 도용과 무단 접근을 막기 위해 본인 확인이
              필수입니다. 입력한 정보는 본인 명의 여부를 확인하고 이후 인증서
              발급 및 로그인 설정에 사용됩니다.
            </p>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoIconContainer}>
            <MdCheckCircle size={24} />
          </div>
          <div>
            <h3 className={styles.infoTitle}>무엇을 준비해야 하나요?</h3>
            <p className={styles.infoDescription}>
              본인 명의 휴대폰, 이름, 주민등록번호, 통신사, 문자 인증번호를 받을
              수 있는 상태
            </p>
          </div>
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h3 className={styles.sectionTitle}>
          <MdListAlt size={20} style={{ color: "#9367ef" }} />
          진행 안내
        </h3>
        <ul className={styles.stepList}>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>1</div>
            <span>본인 확인 방식을 선택해 주세요.</span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>2</div>
            <span>
              이름, 주민등록번호, 통신사, 휴대폰 번호를 정확히 입력해 주세요.
            </span>
          </li>
          <li className={styles.stepItem}>
            <div className={styles.stepNumber}>3</div>
            <span>문자로 받은 인증번호를 입력하면 다음 단계로 이동합니다.</span>
          </li>
        </ul>
      </div>

      <div className={styles.sectionContainer}>
        <ul className={styles.warningList}>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>
              입력 정보가 실제 휴대폰 명의자 정보와 다르면 인증이 실패할 수
              있습니다.
            </span>
          </li>
          <li className={styles.warningItem}>
            <MdWarningAmber
              size={16}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <span>인증번호는 발송 후 제한 시간 안에 입력해야 합니다.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
