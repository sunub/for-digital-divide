import { Grid } from "@internal/design-system/primitives";
import { MdCheckCircle, MdInfoOutline } from "react-icons/md";
import * as styles from "../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";
import { GuideHero } from "./components/GuideHero";
import { GuideInfoCard } from "./components/GuideInfoCard";
import { GuideStepList } from "./components/GuideStepList";
import { GuideWarningList } from "./components/GuideWarningList";
import { TestAccountPanel } from "./components/TestAccountPanel";
import type { TransferGuideContent as TransferGuideContentModel } from "./guideContentData";

interface TransferGuideContentProps {
  content: TransferGuideContentModel;
}

export function TransferGuideContent({ content }: TransferGuideContentProps) {
  return (
    <>
      <GuideHero
        badge={content.badge}
        title={content.title}
        titleHighlight={content.titleHighlight}
        description={content.description}
      />

      <Grid className={styles.infoGrid}>
        <GuideInfoCard
          icon={<MdInfoOutline size={24} />}
          title={content.why.title}
          description={content.why.description}
        />
        <GuideInfoCard
          icon={<MdCheckCircle size={24} />}
          title={content.what.title}
          description={content.what.description}
        />
      </Grid>

      {content.testAccounts ? <TestAccountPanel /> : null}

      <GuideStepList items={content.steps} />

      {content.warnings.length > 0 ? (
        <GuideWarningList items={content.warnings} />
      ) : null}
    </>
  );
}
