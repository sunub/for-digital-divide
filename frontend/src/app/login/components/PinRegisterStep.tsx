"use client";

import { useState } from "react";
import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";

interface StepProps {
  onComplete: () => void;
}

export default function PinRegisterStep({ onComplete }: StepProps) {
  const [pin, setPin] = useState("123456");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      onComplete();
    } else {
      alert("PIN 번호는 6자리 숫자여야 합니다.");
    }
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>간편 PIN 등록</Text>
      <Text as="p" variant="body" style={{ color: "var(--color-text-description)" }}>
        로그인 시 사용할 6자리 간편비밀번호를 설정해 주세요.
      </Text>
      
      <input 
        type="password"
        pattern="[0-9]*"
        inputMode="numeric"
        value={pin} 
        onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))} 
        placeholder="6자리 숫자" 
        maxLength={6}
        style={{ 
          padding: "12px", 
          borderRadius: "8px", 
          border: "1px solid #ccc", 
          width: "100%",
          textAlign: "center",
          fontSize: "1.5rem",
          letterSpacing: "8px"
        }}
        required
      />

      <Button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
        등록 및 로그인 완료
      </Button>
    </Flex>
  );
}
