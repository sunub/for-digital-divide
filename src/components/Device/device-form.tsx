'use client';

import React from 'react';
import styled from 'styled-components';
import { DeviceFrame } from '@/components/ui/device';
import { useForm } from '@conform-to/react';
import { z } from 'zod';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { registerAction } from '@/utils/pin/register';
import { KeypadInfo } from '@/utils/keypad';
import { goToUsername } from '@/utils/revalidate';
import { useNotificationStore } from '@/context/NotificationContext';
import { useAnimate } from 'framer-motion';

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

interface ErrorStatus {
  hasError: boolean;
  errorId: string;
  msg: string | null;
}

function DeviceForm({
  padInfo,
  children,
}: {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}) {
  const [_, animate] = useAnimate();
  const { add, remove } = useNotificationStore((state) => state);
  const [pinErrorStatus, setPinErrorStatus] = React.useState<ErrorStatus>({
    hasError: false,
    errorId: '',
    msg: null,
  });
  const [form, fields] = useForm({
    id: 'pinnumber-input',
    constraint: getZodConstraint(FormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: FormSchema,
      });
    },
  });

  React.useEffect(() => {
    if (pinErrorStatus.hasError) {
      add({
        id: pinErrorStatus.errorId,
        message: pinErrorStatus.msg ?? '',
        type: 'error',
      });

      const timer = window.setTimeout(() => {
        const listItem = document.querySelector(
          `li#${pinErrorStatus.errorId}`,
        ) as HTMLElement;
        animate(listItem, {
          y: ['0%', '100%'],
          opacity: [1, 0],
        }).then(() => remove(pinErrorStatus.errorId));
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [pinErrorStatus]);

  return (
    <form
      id={form.id}
      action={async (formData) => {
        const result = await registerAction(formData, padInfo);

        if (result.status == 'error' && result.id == 'username-not-found') {
          goToUsername();
          return;
        } else if (result.status == 'error') {
          setPinErrorStatus({
            hasError: true,
            errorId: result.id,
            msg: result.msg,
          });
          return;
        }

        add({
          id: result.id,
          message: result.msg ?? '',
          type: 'success',
        });
        return;
      }}
      noValidate
    >
      <DeviceFrame>{children}</DeviceFrame>
    </form>
  );
}

const ErrorStatus = styled.p`
  position: absolute;
  top: 0px;
  left: calc(50cqw - 300px);
  color: var(--color-background);
  background: var(--color-highlight);
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow:
    0px 0px 6.9px rgba(0, 0, 0, 0.011),
    0px 0px 16.7px rgba(0, 0, 0, 0.016),
    0px 0px 31.4px rgba(0, 0, 0, 0.02),
    0px 0px 56.1px rgba(0, 0, 0, 0.024),
    0px 0px 104.9px rgba(0, 0, 0, 0.029),
    0px 0px 251px rgba(0, 0, 0, 0.04);
`;

export default DeviceForm;
