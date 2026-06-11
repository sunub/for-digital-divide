"use client";

import { useState } from "react";
import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";

interface StepProps {
  onNext: () => void;
}

export default function IdCardInfoStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const [issueDate, setIssueDate] = useState(store.idCardInfo || "2023-10-15");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setIdCardInfo(issueDate);
    store.setIdCardVerified(true);
    onNext();
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>주민등록증 정보 입력</Text>
      
      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>발급일자</Text>
        <input 
          value={issueDate} 
          onChange={(e) => setIssueDate(e.target.value)} 
          placeholder="예: YYYY-MM-DD" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
        신분증 정보 제출
      </Button>
    </Flex>
  );
}
