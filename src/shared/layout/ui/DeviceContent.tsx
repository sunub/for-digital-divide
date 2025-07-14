import { HTMLMotionProps } from 'motion/dist/react';
import { ContentContainer, ContentRootWrapper } from '../style';

interface DeviceContentProps extends HTMLMotionProps<'div'> {
  ref?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export function DeviceContent({ children, ref, ...props }: DeviceContentProps) {
  return (
    <ContentRootWrapper>
      <ContentContainer {...props} ref={ref} className={props.className}>
        {children}
      </ContentContainer>
    </ContentRootWrapper>
  );
}
