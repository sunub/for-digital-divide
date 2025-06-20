'use client';

import styled from 'styled-components';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { motion } from 'motion/react';

export const Container = styled(FlexCenterDiv)`
  position: absolute;
  top: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  z-index: 1000;
`;

export const Message = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-width: 20rem;
  max-width: 40rem;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 0.25rem;
  color: white;

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.17);
  backdrop-filter: blur(10px);

  &.toast.success {
    border: 2px solid color-mix(in oklch, oklch(0.8 0.1624 144.21), oklch(0.6731 0.1332 183.57) 40%);
    background-color: color-mix(
      in oklch,
      color-mix(in oklch, oklch(0.6731 0.1624 144.21), oklch(0.6731 0.1332 183.57) 40%),
      transparent
    );
  }
  &.toast.error {
    border: 2px solid color-mix(in oklch, oklch(0.8 0.2153 28.81), oklch(0.9 0.2097 358.28) 50%);
    background-color: color-mix(
      in oklch,
      color-mix(in oklch, oklch(0.6427 0.2153 28.81), oklch(0.7558 0.2097 358.28) 50%),
      transparent
    );
  }
  &.toast.info {
    background-color: color-mix(in oklch, oklch(0.6582 0.169 248.81), transparent);
  }
  &.toast.warning {
    background-color: color-mix(in oklch, oklch(0.7805 0.1776 64.05), transparent);
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

export const SuccessIconContainer = styled(FlexCenterDiv)`
  flex-direction: row;
  gap: 0.25rem;
`;

export const Text = styled.p``;
