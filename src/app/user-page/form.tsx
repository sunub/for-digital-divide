'use client';

import styled from 'styled-components';
import React from 'react';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';
import { useForm } from '@conform-to/react';
import { z } from 'zod';
import { getZodConstraint } from '@conform-to/zod';
import { useFormStatus, useFormState } from 'react-dom';
import { registerAction } from '@/utils/pin/register';
import { KeypadInfo } from '@/utils/keypad';
import { goToUsername } from '@/utils/revalidate';

const PinnumberSchema = z.object({
  pinnumber: z.string().length(4),
});
function DeviceForm({
  padInfo,
  children,
}: {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}) {
  const status = useFormStatus();
  const [lastResult, action] = useFormState(registerAction, undefined);
  const [form, fields] = useForm({
    id: 'pinnumber-input',
    constraint: getZodConstraint(PinnumberSchema),
    lastResult,
  });

  return (
    <form id={form.id} action={action} noValidate>
      <DeviceFrame>{children}</DeviceFrame>
    </form>
  );
}

export default DeviceForm;
