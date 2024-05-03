'use client';

import styled from 'styled-components';
import React from 'react';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';
import { useForm } from '@conform-to/react';
import { z } from 'zod';
import { getZodConstraint } from '@conform-to/zod';

const PinnumberSchema = z.object({
  pinnumber: z.string().length(4),
});

function DeviceForm({ children }: { children: React.ReactNode }) {
  const [form, fields] = useForm({
    id: 'pinnumber-input',
    constraint: getZodConstraint(PinnumberSchema),
  });
  const [pinnumber, setPinnumber] = React.useState(
    Array.from({ length: 4 }, () => -1),
  );
  const pin = Array.from({ length: 4 }, () => '');

  function deletePinnumber() {
    setPinnumber(Array.from({ length: 4 }, () => -1));
  }

  function handleNumpadClick(e: React.MouseEvent<HTMLButtonElement>) {
    const value = Number(e.currentTarget.textContent);
    setPinnumber((prev) => {
      const next = [...prev];
      next[prev.findIndex((v) => v === -1)] = Number(value);
      return next;
    });
  }

  return (
    <form id={form.id} noValidate>
      <DeviceFrame>{children}</DeviceFrame>
    </form>
  );
}

export default DeviceForm;
