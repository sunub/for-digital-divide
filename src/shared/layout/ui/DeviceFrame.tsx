'use client';

import { DeviceFooter } from './DeviceFooter';
import { Container, Frame } from '../style';

interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DeviceFrame({ children, ...props }: DeviceFrameProps) {
  return (
    <Container id="device-root">
      <Frame id="device-wrapper" {...props}>
        {children}
        <DeviceFooter />
      </Frame>
    </Container>
  );
}
