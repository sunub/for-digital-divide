'use client';

import { PinNumpad } from './PinNumpad';
import { createPortal } from 'react-dom';
import { KeypadInfo } from '@/utils/keypad';
import { useEffect, useState } from 'react';

export function PinDrawerContent({ padInfo }: { padInfo: KeypadInfo }) {
  const [mounted, setMounted] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const node = document.getElementById('drawer-content');
    setMounted(node);
  }, []);

  return mounted ? createPortal(<PinNumpad padInfo={padInfo} />, mounted) : null;
}
