"use client";

import { useState } from "react";
import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";

interface StepProps {
  onNext: () => void;
}

export default function AccountStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const [account, setAccount] = useState(store.accountNumber || "123-456-789012");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setAccountNumber(account);
    store.setAccountVerified(true);
    onNext();
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>계좌 인증</Text>
      <Text as="p" variant="body" style={{ color: "var(--color-text-description)" }}>
        본인 명의의 계좌 번호를 입력해 주세요. (1원 송금을 전송합니다.)
      </Text>
      
      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>계좌 번호</Text>
        <input 
          value={account} 
          onChange={(e) => setAccount(e.target.value)} 
          placeholder="숫자만 입력" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
        계좌 인증 요청
      </Button>
    </Flex>
  );
}
