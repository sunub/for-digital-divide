import React from "react";
import { Checkbox } from "@/components/CheckBox";
import { allAgreementWrapper } from "../TermsStep.css";

interface Props {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TermsAllAgreementComponent({ checked, onChange }: Props) {
  return (
    <div className={allAgreementWrapper}>
      <Checkbox checked={checked} onChange={onChange} isBold>
        전체동의 (선택 동의 포함)
      </Checkbox>
    </div>
  );
}

export const TermsAllAgreement = React.memo(TermsAllAgreementComponent);
