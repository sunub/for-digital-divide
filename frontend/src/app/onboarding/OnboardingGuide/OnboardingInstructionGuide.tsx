import { Text } from "@internal/design-system/components";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { MdListAlt, MdWarningAmber } from "react-icons/md";
import { Instruction } from "@/components/Instruction";

const accentIconStyle = { color: "var(--color-button)" };
const warningIconStyle = { color: "var(--color-destructive)" };

interface GuideInfoItem {
  title: string;
  description: ReactNode;
  icon: IconType;
}

interface GuideStepItem {
  content: ReactNode;
}

interface OnboardingInstructionGuideProps {
  badgeLabel: string;
  badgeIcon: IconType;
  title: ReactNode;
  description?: ReactNode;
  infoItems?: GuideInfoItem[];
  steps?: GuideStepItem[];
  warnings?: ReactNode[];
  activeStep?: number;
}

export function OnboardingInstructionGuide({
  badgeLabel,
  badgeIcon: BadgeIcon,
  title,
  description,
  infoItems = [],
  steps = [],
  warnings = [],
  activeStep,
}: OnboardingInstructionGuideProps) {
  return (
    <Instruction.Panel>
      <Instruction.Badge icon={<BadgeIcon size={18} style={accentIconStyle} />}>
        {badgeLabel}
      </Instruction.Badge>

      <Instruction.Title
        as="h1"
        style={{ fontSize: "2rem", lineHeight: "1.2", margin: "1rem 0" }}
      >
        {title}
      </Instruction.Title>

      {description && (
        <Text as="p" variant="body" color="descriptionText">
          {description}
        </Text>
      )}

      {infoItems.map(
        ({
          title: infoTitle,
          description: infoDescription,
          icon: InfoIcon,
        }) => (
          <Instruction.InfoBox
            key={infoTitle}
            title={infoTitle}
            icon={<InfoIcon size={24} style={accentIconStyle} />}
          >
            <Text as="p" variant="body" color="text">
              {infoDescription}
            </Text>
          </Instruction.InfoBox>
        ),
      )}

      {steps.length > 0 && (
        <Instruction.Box>
          <Instruction.Title
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <MdListAlt size={20} style={accentIconStyle} />
            진행 안내
          </Instruction.Title>
          <Instruction.List activeStep={activeStep}>
            {steps.map((stepItem, index) => (
              <Instruction.Item key={String(stepItem.content)} step={index + 1}>
                {stepItem.content}
              </Instruction.Item>
            ))}
          </Instruction.List>
        </Instruction.Box>
      )}

      {warnings.length > 0 && (
        <Instruction.InfoBox
          title="주의사항"
          tone="destructive"
          icon={<MdWarningAmber size={24} style={warningIconStyle} />}
        >
          {warnings.map((warning) => (
            <Text key={String(warning)} as="p" variant="body" color="text">
              {warning}
            </Text>
          ))}
        </Instruction.InfoBox>
      )}
    </Instruction.Panel>
  );
}
