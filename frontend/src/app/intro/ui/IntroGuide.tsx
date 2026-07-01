import { Text } from "@internal/design-system/components";
import { Flex, Grid } from "@internal/design-system/primitives";
import { MdInfoOutline, MdListAlt, MdVerifiedUser } from "react-icons/md";
import * as guideStyles from "../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

export function IntroGuide() {
  return (
    <Flex direction="column" className={guideStyles.panelContainer}>
      <div className={guideStyles.badge}>
        <MdVerifiedUser size={18} />
        <span>모바일 뱅킹 인증센터</span>
      </div>

      <h1 className={guideStyles.title}>
        안전한 금융 거래를 위한
        <br />
        <span className={guideStyles.titleHighlight}>인증서 발급 안내</span>
      </h1>

      <p className={guideStyles.description}>
        금융 인증서는 PC에서 모바일 금융 서비스를 이용할 때 본인 확인과
        전자서명을 안전하게 이어주는 수단입니다. 지금부터 실제 발급 전에 필요한
        본인인증 과정을 차례대로 진행합니다.
      </p>

      <Grid className={guideStyles.infoGrid}>
        <Flex direction="column" className={guideStyles.infoBox}>
          <Flex
            alignItems="center"
            justifyContent="center"
            className={guideStyles.infoIconContainer}
          >
            <MdInfoOutline size={24} />
          </Flex>
          <div>
            <h3 className={guideStyles.infoTitle}>왜 인증서가 필요한가요?</h3>
            <p className={guideStyles.infoDescription}>
              본인 확인 및 전자 서명을 통해 도용을 방지하고, 송금 및 상품 가입
              시 법적 효력을 갖는 안전한 금융 거래를 보장하기 위해 필요합니다.
            </p>
          </div>
        </Flex>
      </Grid>

      <Flex direction="column" className={guideStyles.sectionContainer}>
        <h3 className={guideStyles.sectionTitle}>
          <MdListAlt size={20} style={{ color: "var(--color-button)" }} />
          발급을 위해 진행할 단계
        </h3>
        <Text
          as="p"
          variant="description"
          color="descriptionText"
          style={{ marginBottom: "1rem" }}
        >
          아래 단계는 다음 화면에서 실제로 수행할 본인인증 흐름의 요약입니다.
          안내를 읽고 오른쪽 휴대폰 화면에서 순서대로 진행해 주세요.
        </Text>
        <ul className={guideStyles.stepList}>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>1</div>
            <span>
              인증 방식을 선택하고 이름, 주민등록번호, 통신사, 휴대폰 번호를
              입력합니다.
            </span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>2</div>
            <span>
              휴대폰으로 받은 SMS 인증번호를 입력해 본인 소유의 기기인지
              확인합니다.
            </span>
          </li>
          <li className={guideStyles.stepItem}>
            <div className={guideStyles.stepNumber}>3</div>
            <span>
              필수 약관에 동의한 뒤 주민등록증 또는 운전면허증을 선택하고 신분증
              정보를 입력합니다.
            </span>
          </li>
        </ul>
      </Flex>
    </Flex>
  );
}
