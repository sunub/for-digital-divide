import { Box } from "@internal/design-system/primitives";
import React from "react";
import { Checkbox } from "@/components/CheckBox";

interface Props {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TermsAllAgreementComponent({ checked, onChange }: Props) {
  return (
    <Box style={{ marginBottom: "3cqh" }}>
      <Checkbox checked={checked} onChange={onChange} isBold>
        전체동의 (선택 동의 포함)
      </Checkbox>
    </Box>
  );
}

export const TermsAllAgreement = React.memo(TermsAllAgreementComponent);
