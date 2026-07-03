import { MdSwapHoriz } from "react-icons/md";
import * as styles from "../../../../onboarding/OnboardingGuide/PhoneVerificationGuide.css";

interface GuideHeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
}

export function GuideHero({
  badge,
  title,
  titleHighlight,
  description,
}: GuideHeroProps) {
  return (
    <>
      <div className={styles.badge}>
        <MdSwapHoriz size={18} />
        <span>{badge}</span>
      </div>
      <h1 className={styles.title}>
        {title}
        <br />
        <span className={styles.titleHighlight}>{titleHighlight}</span>
      </h1>
      <p className={styles.description}>{description}</p>
    </>
  );
}
