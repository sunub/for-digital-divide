import { memo } from 'react';
import { BackButton } from './buttons/BackButton';
import { HomeButton } from './buttons/HomeButton';
import { DeviceFooterContainer, PlaceCenter } from '../style';

interface DeviceFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DeviceFooter = memo(({ ...props }: DeviceFooterProps) => {
  return (
    <DeviceFooterContainer {...props}>
      <PlaceCenter $type="home">
        <HomeButton href="/" />
      </PlaceCenter>
      <PlaceCenter $type="back">
        <BackButton />
      </PlaceCenter>
    </DeviceFooterContainer>
  );
});
