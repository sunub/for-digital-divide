'use client';

import { z } from 'zod';
import React, { useCallback } from 'react';
import { DeviceFrame } from '@/components/ui/device';
import { useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { registerAction } from '@/utils/pin/register';
import { KeypadInfo } from '@/utils/keypad';
import { goToUsername } from '@/utils/revalidate';
import { useToastMsg } from '@/hooks/use-toast-msg';

const validNumpadLength = 4;
const noneEmptyString = z.string().min(1);
const PinNumberSchema = z
  .array(noneEmptyString)
  .refine((v) => v.length === validNumpadLength, {
    message: '핀번호는 4자리여야 합니다.',
  });

export const FormSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});

function DeviceForm({
  padInfo,
  children,
}: {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}) {
  const showToastMsg = useToastMsg();
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
    const result = await registerAction(formData, padInfo);
    if (result.status == 'error' && result.id == 'username-not-found') {
      if (result.id == 'username-not-found') return goToUsername();
      return showToastMsg({
        id: result.id,
        message: result.msg,
        type: 'error',
      });
    }
    showToastMsg({
      id: 'pin-pattern-input-success',
      message: '핀번호가 등록되었습니다.',
      type: 'success',
    });
  }, []);

  return (
    <form id={form.id} action={handleAction} noValidate>
      <DeviceFrame>{children}</DeviceFrame>
    </form>
  );
}

export default DeviceForm;
