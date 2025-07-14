'use client';

import { AtSignIcon } from 'lucide-react';
import { LeadingIconInput } from '@/components/LeadingIconInput';

interface EmailInputProps extends React.HTMLAttributes<HTMLDivElement> {
  validateAction: (value: unknown) => boolean;
}

export function EmailInput({ validateAction, ...props }: EmailInputProps) {
  return (
    <LeadingIconInput
      id="register-email"
      name="email"
      inputContent="이메일을 입력해주세요"
      labelContent="이메일"
      autoComplete="email"
      validateAction={validateAction}
      {...props}
    >
      <AtSignIcon size={16} />
    </LeadingIconInput>
  );
}
