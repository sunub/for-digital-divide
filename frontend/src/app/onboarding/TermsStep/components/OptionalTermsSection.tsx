import { Box, Flex } from "@internal/design-system/primitives";
import React from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { Checkbox } from "@/components/CheckBox";
import {
  chevronIcon,
  itemGroupHeaderChevron,
  optionalSectionGuide,
  sectionCard,
  sectionHeader,
  subItemContainerBordered,
  textGray,
  textSmallGray,
} from "../TermsStep.css";

interface Props {
  values: {
    personalInfoCollectionOptional: boolean;
    marketingSms: boolean;
    marketingCall: boolean;
    marketingEmail: boolean;
    marketingMail: boolean;
    personalInfoProvisionOptional: boolean;
    marketingPush: boolean;
  };
  isAllOptChecked: boolean;
  onChange: (key: string, checked: boolean) => void;
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSubGroup: (checked: boolean) => void;
  onToggleMarketingAll: (checked: boolean) => void;
}

function OptionalTermsSectionComponent({
  values,
  isAllOptChecked,
  onChange,
  onToggleAll,
  onToggleSubGroup,
  onToggleMarketingAll,
}: Props) {
  const isMarketingAllChecked =
    values.marketingSms &&
    values.marketingCall &&
    values.marketingEmail &&
    values.marketingMail;

  const isCollectionGroupChecked =
    values.personalInfoCollectionOptional &&
    isMarketingAllChecked &&
    values.personalInfoProvisionOptional;

  return (
    <Box className={sectionCard}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={4}
        className={sectionHeader}
      >
        <Checkbox checked={isAllOptChecked} onChange={onToggleAll}>
          [선택] 전체동의
        </Checkbox>
        <MdExpandMore className={chevronIcon} />
      </Flex>
      <Flex direction="column" gap={4} padding={4}>
        <Flex direction="column" width="full">
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            width="full"
          >
            <Checkbox
              checked={isCollectionGroupChecked}
              onChange={(e) => onToggleSubGroup(e.target.checked)}
            >
              <span className={textGray}>
                [선택] 개인(신용)정보 수집·이용 및 제공 동의서
                <br />
                <span className={textSmallGray}>(상품서비스 안내 등)</span>
              </span>
            </Checkbox>
            <MdChevronRight className={itemGroupHeaderChevron} />
          </Flex>

          <Flex
            direction="column"
            gap={2}
            paddingTop={2}
            paddingBottom={2}
            className={subItemContainerBordered}
            style={{ marginTop: 16 }}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="full"
            >
              <Checkbox
                checked={values.personalInfoCollectionOptional}
                onChange={(e) =>
                  onChange("personalInfoCollectionOptional", e.target.checked)
                }
              >
                <span className={textGray}>개인(신용)정보 수집 · 이용동의</span>
              </Checkbox>
            </Flex>

            <Box style={{ marginBottom: "1.5cqh" }}>
              <Checkbox
                checked={isMarketingAllChecked}
                onChange={(e) => onToggleMarketingAll(e.target.checked)}
              >
                <span className={textGray}>광고성정보 수신동의</span>
              </Checkbox>
            </Box>

            <Flex
              direction="column"
              gap={2}
              marginTop={2}
              style={{ marginLeft: 32 }}
            >
              <Checkbox
                checked={values.marketingSms}
                onChange={(e) => onChange("marketingSms", e.target.checked)}
              >
                <span className={textSmallGray}>
                  문자메시지(SMS, LMS, 모바일메시지 등)
                </span>
              </Checkbox>
              <Checkbox
                checked={values.marketingCall}
                onChange={(e) => onChange("marketingCall", e.target.checked)}
              >
                <span className={textSmallGray}>전화</span>
              </Checkbox>
              <Checkbox
                checked={values.marketingEmail}
                onChange={(e) => onChange("marketingEmail", e.target.checked)}
              >
                <span className={textSmallGray}>전자우편(이메일)</span>
              </Checkbox>
              <Checkbox
                checked={values.marketingMail}
                onChange={(e) => onChange("marketingMail", e.target.checked)}
              >
                <span className={textSmallGray}>우편, 택배 등</span>
              </Checkbox>
            </Flex>

            <Flex alignItems="center" style={{ marginTop: "2cqh" }}>
              <Checkbox
                checked={values.personalInfoProvisionOptional}
                onChange={(e) =>
                  onChange("personalInfoProvisionOptional", e.target.checked)
                }
              >
                <span className={textGray}>개인(신용)정보 제공 동의</span>
              </Checkbox>
            </Flex>
          </Flex>

          <Flex alignItems="center" justifyContent="space-between" width="full">
            <Checkbox
              checked={values.marketingPush}
              onChange={(e) => onChange("marketingPush", e.target.checked)}
            >
              <span className={textGray}>마케팅 푸시 알림 동의</span>
            </Checkbox>
          </Flex>
        </Flex>
      </Flex>

      <p className={optionalSectionGuide}>
        · 재테크, 상품, 이벤트 정보를 받아보려면 동의해 주세요.
      </p>
    </Box>
  );
}

export const OptionalTermsSection = React.memo(OptionalTermsSectionComponent);
