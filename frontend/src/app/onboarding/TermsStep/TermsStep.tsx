import { Flex } from "@internal/design-system/primitives";
import { useCallback, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { OptionalTermsSection } from "./components/OptionalTermsSection";
import { RequiredTermsSection } from "./components/RequiredTermsSection";
import { TermsAllAgreement } from "./components/TermsAllAgreement";
import { TermsFooter } from "./components/TermsFooter";
import { TermsHeader } from "./components/TermsHeader";
import { termsSchema } from "./schema";
import { scrollContent } from "./TermsStep.css";

interface StepProps {
  onNext: () => void;
}

export default function TermsStep({ onNext }: StepProps) {
  const store = useOnboardingStore(
    useShallow((store) => ({
      setTermsAgreed: store.setTermsAgreed,
      setOptionalTerms: store.setOptionalTerms,
    })),
  );

  const [req, setReq] = useState({
    hanaOneQApp: false,
    donTong: false,
    hanaCertService: false,
    certUniqueIdInfo: false,
    certPersonalInfo: false,
    certCriticalIdInfo: false,
    thirdPartyProvisionInfo: false,
    autoLoginInfo: false,
  });

  const [opt, setOpt] = useState({
    personalInfoCollectionOptional: false,
    marketingSms: false,
    marketingCall: false,
    marketingEmail: false,
    marketingMail: false,
    personalInfoProvisionOptional: false,
    marketingPush: false,
  });

  const isAllReqChecked = useMemo(
    () => Object.values(req).every(Boolean),
    [req],
  );
  const isAllOptChecked = useMemo(
    () => Object.values(opt).every(Boolean),
    [opt],
  );
  const isAllChecked = isAllReqChecked && isAllOptChecked;

  const handleToggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setReq({
        hanaOneQApp: checked,
        donTong: checked,
        hanaCertService: checked,
        certUniqueIdInfo: checked,
        certPersonalInfo: checked,
        certCriticalIdInfo: checked,
        thirdPartyProvisionInfo: checked,
        autoLoginInfo: checked,
      });
      setOpt({
        personalInfoCollectionOptional: checked,
        marketingSms: checked,
        marketingCall: checked,
        marketingEmail: checked,
        marketingMail: checked,
        personalInfoProvisionOptional: checked,
        marketingPush: checked,
      });
    },
    [],
  );

  const handleToggleReqAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setReq({
        hanaOneQApp: checked,
        donTong: checked,
        hanaCertService: checked,
        certUniqueIdInfo: checked,
        certPersonalInfo: checked,
        certCriticalIdInfo: checked,
        thirdPartyProvisionInfo: checked,
        autoLoginInfo: checked,
      });
    },
    [],
  );

  const handleToggleOptAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setOpt({
        personalInfoCollectionOptional: checked,
        marketingSms: checked,
        marketingCall: checked,
        marketingEmail: checked,
        marketingMail: checked,
        personalInfoProvisionOptional: checked,
        marketingPush: checked,
      });
    },
    [],
  );

  const handleToggleMarketingGroup = useCallback((checked: boolean) => {
    setOpt((prev) => ({
      ...prev,
      personalInfoCollectionOptional: checked,
      marketingSms: checked,
      marketingCall: checked,
      marketingEmail: checked,
      marketingMail: checked,
      personalInfoProvisionOptional: checked,
    }));
  }, []);

  const handleToggleMarketingAll = useCallback((checked: boolean) => {
    setOpt((prev) => ({
      ...prev,
      marketingSms: checked,
      marketingCall: checked,
      marketingEmail: checked,
      marketingMail: checked,
    }));
  }, []);

  const handleToggleCertAll = useCallback((checked: boolean) => {
    setReq((prev) => ({
      ...prev,
      certUniqueIdInfo: checked,
      certPersonalInfo: checked,
      certCriticalIdInfo: checked,
    }));
  }, []);

  const handleReqChange = useCallback((key: string, checked: boolean) => {
    setReq((prev) => ({ ...prev, [key as keyof typeof req]: checked }));
  }, []);

  const handleOptChange = useCallback((key: string, checked: boolean) => {
    setOpt((prev) => ({ ...prev, [key as keyof typeof opt]: checked }));
  }, []);

  const isValid = useMemo(() => termsSchema.safeParse(req).success, [req]);

  const handleSubmit = useCallback(() => {
    if (isValid) {
      store.setTermsAgreed(true);
      store.setOptionalTerms(opt);
      onNext();
    }
  }, [isValid, opt, onNext, store]);

  return (
    <>
      <Flex
        direction="column"
        position="relative"
        width="full"
        style={{ backgroundColor: "#f9f9f9", overflow: "hidden" }}
      >
        <div className={scrollContent}>
          <TermsHeader />
          <TermsAllAgreement
            checked={isAllChecked}
            onChange={handleToggleAll}
          />

          <RequiredTermsSection
            values={req}
            isAllReqChecked={isAllReqChecked}
            onChange={handleReqChange}
            onToggleAll={handleToggleReqAll}
            onToggleCertAll={handleToggleCertAll}
          />

          <OptionalTermsSection
            values={opt}
            isAllOptChecked={isAllOptChecked}
            onChange={handleOptChange}
            onToggleAll={handleToggleOptAll}
            onToggleSubGroup={handleToggleMarketingGroup}
            onToggleMarketingAll={handleToggleMarketingAll}
          />
        </div>
      </Flex>
      <TermsFooter onNext={handleSubmit} disabled={!isValid} />
    </>
  );
}
