"use client";

import { useState } from "react";
import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";

interface StepProps {
  onNext: () => void;
}

export default function VerifyOtpStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const [code, setCode] = useState(store.smsCode || "123456");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setSmsCode(code);
    store.setSmsVerified(true);
    onNext();
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>인증번호 입력</Text>
      <Text as="p" variant="body" style={{ color: "var(--color-text-description)" }}>
        입력하신 휴대폰 번호로 발송된 6자리 인증번호를 입력해 주세요.
      </Text>
      
      <input 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        placeholder="인증번호 6자리" 
        maxLength={6}
        style={{ 
          padding: "12px", 
          borderRadius: "8px", 
          border: "1px solid #ccc", 
          width: "100%",
          textAlign: "center",
          fontSize: "1.2rem",
          letterSpacing: "4px"
        }}
        required
      />

      <Button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
        인증번호 확인
      </Button>
    </Flex>
  );
}
