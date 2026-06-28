import {
  Button,
  Text,
  VisuallyHidden,
} from "@internal/design-system/components";
import { Box, Flex } from "@internal/design-system/primitives";
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
    <Flex direction="column" paddingTop={8} height="full">
      <Flex direction="column" style={{ flex: 1 }} paddingBottom={8}>
        <Text
          as="h1"
          variant="hero"
          textAlign="center"
          marginTop={2}
          marginBottom={6}
        >
          신분증을 선택해
          <br />
          주세요.
        </Text>

        <IdCardIllustration />

        <Box as="fieldset" className={styles.optionsFieldset}>
          <VisuallyHidden>신분증 선택</VisuallyHidden>
          <Flex direction="column" gap={2}>
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
        </Box>
      </Flex>

      <Flex marginTop="auto" paddingBottom={2}>
        <Button type="button" size="wide" onClick={handleSubmit}>
          신분증 인증
        </Button>
      </Flex>
    </Flex>
  );
}
