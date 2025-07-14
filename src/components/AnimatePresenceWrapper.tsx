'use client';

import { AnimatePresence } from 'motion/react';
import React from 'react';

export function AnimatePresenceWrapper({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
