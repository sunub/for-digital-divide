import { Button } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  type OnboardingState,
  useOnboardingStore,
} from "@/store/onboarding/onboarding-store";
import { IdCardIllustration } from "./IdCardIllustration";
import { IdCardOption } from "./IdCardOption";
import * as styles from "./IdCardSelectionStep.css";

interface StepProps {
  onNext: () => void;
}

type IdCardType = NonNullable<OnboardingState["selectedIdCardType"]>;

interface IdCardOptionConfig {
  value: IdCardType;
  label: string;
  disabled?: boolean;
}

const ID_CARD_OPTIONS: IdCardOptionConfig[] = [
  { value: "resident", label: "주민등록증 또는 운전면허증" },
  { value: "driver", label: "모바일 운전면허증", disabled: true },
  { value: "passport", label: "여권", disabled: true },
];

export function IdCardSelectionStep({ onNext }: StepProps) {
  const store = useOnboardingStore(
    useShallow((store) => ({
      selectedIdCardType: store.selectedIdCardType,
      setSelectedIdCardType: store.setSelectedIdCardType,
    })),
  );
  const [selectedType, setSelectedType] = useState<IdCardType>(
    store.selectedIdCardType ?? "resident",
  );

  const handleSubmit = () => {
    store.setSelectedIdCardType(selectedType);
    onNext();
  };

  return (
    <Flex direction="column" paddingTop={"2rem"} className={styles.root}>
      <Flex direction="column" className={styles.content}>
        <h1 className={styles.title}>
          신분증을 선택해
          <br />
          주세요.
        </h1>

        <IdCardIllustration />

        <fieldset className={styles.optionsFieldset}>
          <legend className={styles.srOnly}>신분증 선택</legend>
          <Flex direction="column" className={styles.optionsList}>
            {ID_CARD_OPTIONS.map((option) => (
              <IdCardOption
                key={option.value}
                value={option.value}
                currentValue={selectedType}
                onChange={setSelectedType}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </Flex>
        </fieldset>
      </Flex>

      <Flex className={styles.action}>
        <Button
          type="button"
          size="wide"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          신분증 인증
        </Button>
      </Flex>
    </Flex>
  );
}
