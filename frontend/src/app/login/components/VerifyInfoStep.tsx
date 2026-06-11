"use client";

import { useState } from "react";
import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";

interface StepProps {
  onNext: () => void;
}

export default function VerifyInfoStep({ onNext }: StepProps) {
  const store = useOnboardingStore();
  const [name, setName] = useState(store.verifyName || "홍길동");
  const [resident, setResident] = useState(store.verifyResidentNumber || "900101-1234567");
  const [carrier, setCarrier] = useState(store.verifyCarrier || "SKT");
  const [phone, setPhone] = useState(store.verifyPhoneNumber || "010-1234-5678");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setVerifyInfo({
      verifyName: name,
      verifyResidentNumber: resident,
      verifyCarrier: carrier,
      verifyPhoneNumber: phone,
    });
    store.setVerifyInfoSubmitted(true);
    onNext();
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} direction="column" gap="1rem" width="full">
      <Text as="h2" variant="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>본인정보 입력</Text>
      
      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>이름</Text>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="이름을 입력하세요" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>주민등록번호</Text>
        <input 
          value={resident} 
          onChange={(e) => setResident(e.target.value)} 
          placeholder="주민등록번호를 입력하세요" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>통신사</Text>
        <input 
          value={carrier} 
          onChange={(e) => setCarrier(e.target.value)} 
          placeholder="통신사 선택 (예: SKT, KT, LGU+)" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Flex direction="column" gap="0.5rem">
        <Text as="span" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>휴대폰 전화번호</Text>
        <input 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="휴대폰 번호를 입력하세요" 
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", width: "100%" }}
          required
        />
      </Flex>

      <Button type="submit" style={{ width: "100%", marginTop: "1rem" }}>
        본인정보 입력 완료
      </Button>
    </Flex>
  );
}
