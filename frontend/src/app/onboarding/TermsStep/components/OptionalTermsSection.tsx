import React from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { Checkbox } from "@/components/CheckBox";
import {
  chevronIcon,
  itemGroupHeaderChevron,
  itemRow,
  itemRowGroup,
  itemRowGroupHeader,
  marketingHeaderWrapper,
  optionalSectionGuide,
  personalInfoProvisionWrapper,
  sectionCard,
  sectionContent,
  sectionHeader,
  subItemContainer,
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
    <div className={sectionCard}>
      <div className={sectionHeader}>
        <Checkbox checked={isAllOptChecked} onChange={onToggleAll}>
          [선택] 전체동의
        </Checkbox>
        <MdExpandMore className={chevronIcon} />
      </div>
      <div className={sectionContent}>
        <div className={itemRowGroup}>
          <div className={itemRowGroupHeader}>
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
          </div>

          <div className={subItemContainerBordered}>
            <div className={itemRow}>
              <Checkbox
                checked={values.personalInfoCollectionOptional}
                onChange={(e) =>
                  onChange("personalInfoCollectionOptional", e.target.checked)
                }
              >
                <span className={textGray}>개인(신용)정보 수집 · 이용동의</span>
              </Checkbox>
            </div>

            <div className={marketingHeaderWrapper}>
              <Checkbox
                checked={isMarketingAllChecked}
                onChange={(e) => onToggleMarketingAll(e.target.checked)}
              >
                <span className={textGray}>광고성정보 수신동의</span>
              </Checkbox>
            </div>

            <div className={subItemContainer}>
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
            </div>

            <div className={personalInfoProvisionWrapper}>
              <Checkbox
                checked={values.personalInfoProvisionOptional}
                onChange={(e) =>
                  onChange("personalInfoProvisionOptional", e.target.checked)
                }
              >
                <span className={textGray}>개인(신용)정보 제공 동의</span>
              </Checkbox>
            </div>
          </div>

          <div className={itemRow}>
            <Checkbox
              checked={values.marketingPush}
              onChange={(e) => onChange("marketingPush", e.target.checked)}
            >
              <span className={textGray}>마케팅 푸시 알림 동의</span>
            </Checkbox>
          </div>
        </div>
      </div>

      <p className={optionalSectionGuide}>
        · 재테크, 상품, 이벤트 정보를 받아보려면 동의해 주세요.
      </p>
    </div>
  );
}

export const OptionalTermsSection = React.memo(OptionalTermsSectionComponent);
