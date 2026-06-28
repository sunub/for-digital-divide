import { Button } from "@internal/design-system/components";
import { Box } from "@internal/design-system/primitives";
import React from "react";
import { footer } from "../TermsStep.css";

interface Props {
  onNext: () => void;
  disabled: boolean;
}

function TermsFooterComponent({ onNext, disabled }: Props) {
  return (
    <Box className={footer}>
      <Button
        size="wide"
        variant="primary"
        onClick={onNext}
        disabled={disabled}
      >
        다음
      </Button>
    </Box>
  );
}

export const TermsFooter = React.memo(TermsFooterComponent);
