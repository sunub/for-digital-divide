import { Box, Flex } from "@internal/design-system/primitives";
import React from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { Checkbox } from "@/components/CheckBox";
import {
  chevronIcon,
  itemGroupHeaderChevron,
  sectionCard,
  sectionHeader,
  textGray,
  textSmallGray,
} from "../TermsStep.css";

interface Props {
  values: {
    hanaOneQApp: boolean;
    donTong: boolean;
    hanaCertService: boolean;
    certUniqueIdInfo: boolean;
    certPersonalInfo: boolean;
    certCriticalIdInfo: boolean;
    thirdPartyProvisionInfo: boolean;
    autoLoginInfo: boolean;
  };
  isAllReqChecked: boolean;
  onChange: (key: string, checked: boolean) => void;
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleCertAll: (checked: boolean) => void;
}

function RequiredTermsSectionComponent({
  values,
  isAllReqChecked,
  onChange,
  onToggleAll,
  onToggleCertAll,
}: Props) {
  return (
    <Box className={sectionCard}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        padding={4}
        className={sectionHeader}
      >
        <Checkbox checked={isAllReqChecked} onChange={onToggleAll}>
          [필수] 전체동의
        </Checkbox>
        <MdExpandMore className={chevronIcon} />
      </Flex>
      <Flex direction="column" gap={4} padding={4}>
        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Checkbox
            checked={values.hanaOneQApp}
            onChange={(e) => onChange("hanaOneQApp", e.target.checked)}
          >
            <span className={textGray}>하나원큐 앱 이용약관</span>
          </Checkbox>
          <MdChevronRight className={chevronIcon} />
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Checkbox
            checked={values.donTong}
            onChange={(e) => onChange("donTong", e.target.checked)}
          >
            <span className={textGray}>돈통 이용약관</span>
          </Checkbox>
          <MdChevronRight className={chevronIcon} />
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Checkbox
            checked={values.hanaCertService}
            onChange={(e) => onChange("hanaCertService", e.target.checked)}
          >
            <span className={textGray}>하나인증서 서비스 이용약관</span>
          </Checkbox>
          <MdChevronRight className={chevronIcon} />
        </Flex>

        <Flex direction="column" width="full">
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            width="full"
          >
            <Checkbox
              checked={
                values.certUniqueIdInfo &&
                values.certPersonalInfo &&
                values.certCriticalIdInfo
              }
              onChange={(e) => onToggleCertAll(e.target.checked)}
            >
              <span className={textGray}>
                개인(신용)정보 수집이용제공 동의
                <br />
                (하나인증서 서비스)
              </span>
            </Checkbox>
            <MdChevronRight className={itemGroupHeaderChevron} />
          </Flex>

          <Flex
            direction="column"
            gap={2}
            marginTop={2}
            style={{ marginLeft: 32 }}
          >
            <Checkbox
              checked={values.certUniqueIdInfo}
              onChange={(e) => onChange("certUniqueIdInfo", e.target.checked)}
            >
              <span className={textSmallGray}>
                고유식별정보 수집·이용에 동의
              </span>
            </Checkbox>
            <Checkbox
              checked={values.certPersonalInfo}
              onChange={(e) => onChange("certPersonalInfo", e.target.checked)}
            >
              <span className={textSmallGray}>
                개인(신용)정보 수집·이용에 동의
              </span>
            </Checkbox>
            <Checkbox
              checked={values.certCriticalIdInfo}
              onChange={(e) => onChange("certCriticalIdInfo", e.target.checked)}
            >
              <span className={textSmallGray}>
                중요식별정보(CI) 수집·이용에 동의
              </span>
            </Checkbox>
          </Flex>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Checkbox
            checked={values.thirdPartyProvisionInfo}
            onChange={(e) =>
              onChange("thirdPartyProvisionInfo", e.target.checked)
            }
          >
            <span className={textGray}>
              개인정보 제3자 제공 동의(사단법인 금융결제원 신원확인용)
            </span>
          </Checkbox>
          <MdChevronRight className={chevronIcon} />
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" width="full">
          <Checkbox
            checked={values.autoLoginInfo}
            onChange={(e) => onChange("autoLoginInfo", e.target.checked)}
          >
            <span className={textGray}>
              개인정보 수집이용 제공 동의(자동로그인 서비스)
            </span>
          </Checkbox>
          <MdChevronRight className={chevronIcon} />
        </Flex>
      </Flex>
    </Box>
  );
}

export const RequiredTermsSection = React.memo(RequiredTermsSectionComponent);
