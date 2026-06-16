import React from "react";
import { headerTitle } from "../TermsStep.css";

function TermsHeaderComponent() {
  return <h1 className={headerTitle}>약관에 동의해 주세요</h1>;
}

export const TermsHeader = React.memo(TermsHeaderComponent);
