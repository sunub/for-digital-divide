'use client';

import { useCallback } from 'react';
import { z } from 'zod';
import { DeviceFrame } from '@/shared/layout';
import { KeypadInfo } from '@/utils/keypad';
import { goToUsername } from '@/utils/revalidate';
import { useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { pinRegisterAction } from '../utils/pinRegisterAction';
import { useToast } from '@/provider/toast/hooks/useToast';

interface PinFormProps extends React.HTMLAttributes<HTMLFormElement> {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}

const validNumpadLength = 4;
const noneEmptyString = z.string().min(1);
const PinNumberSchema = z.array(noneEmptyString).refine(v => v.length === validNumpadLength, {
  message: '핀번호는 4자리여야 합니다.',
});

const FormSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});

export function PinForm({ padInfo, children, ...props }: PinFormProps) {
  const showToast = useToast();

  const [form] = useForm({
    id: 'pinnumber-input',
    constraint: getZodConstraint(FormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: FormSchema,
      });
    },
  });

  const handleAction = useCallback(async (formData: FormData) => {
    const result = await pinRegisterAction(formData, padInfo);
    if (result.status == 'error') {
      return showToast('error', result.message);
    }
    showToast('success', '핀번호가 등록되었습니다.');
  }, []);

  return (
    <form id={form.id} action={handleAction} noValidate {...props}>
      {children}
    </form>
  );
}
