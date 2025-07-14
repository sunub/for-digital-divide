'use client';

import { FlexCenterDiv, FlexDivideDiv } from '@/shared/style/component/div';
import { fullSize } from '@/shared/style/css/size';
import styled from 'styled-components';
import { SmileIcon, LogOutIcon, HandIcon } from 'lucide-react';
import { motion, useAnimate } from 'motion/react';
import { Tooltip } from '@/components/Tooltip';

export function DashboardHeader({ username }: { username: string | null }) {
  const [scope, animate] = useAnimate();

  return (
    <HeaderContainer>
      <HeaderLeftContainer
        onMouseEnter={() => {
          animate(scope.current, { scale: [0, 1, 1.2, 1] }, { duration: 0.5 });
          animate(scope.current, { rotate: [0, 80, -30, 80, 40] }, { duration: 1 });
        }}
        onMouseLeave={() => {
          animate(scope.current, { rotate: [40, -80, 30, -80, 0] }, { duration: 0.5 });
          animate(scope.current, { scale: [1, 1.2, 1, 0] }, { duration: 1 });
        }}
      >
        <HeaderIconContainer>
          <HandIconContainer
            ref={scope}
            initial={{ rotate: 0, scale: 0 }}
            transition={{ duration: 3, ease: 'anticipate', repeat: Infinity }}
          >
            <HandIcon size={18} strokeWidth={3} fill="white" />
          </HandIconContainer>
          <SmileIcon size={18} strokeWidth={3} fill="white" />
        </HeaderIconContainer>
        <p>
          <Username>{username || 'Guest'}</Username>님
        </p>
      </HeaderLeftContainer>

      <HeaderRightContainer>
        <Tooltip>
          <Tooltip.Trigger>
            <LogOutIcon size={18} strokeWidth={3} />
          </Tooltip.Trigger>
          <Tooltip.Content>로그아웃</Tooltip.Content>
        </Tooltip>
      </HeaderRightContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled(FlexDivideDiv)`
  grid-area: dashboard-header / 1;
  ${fullSize};

  position: sticky;
  top: 0;
  z-index: 10;
  margin-top: 1rem;

  color: color-mix(in oklch, var(--color-accent), oklch(0.4002 0.206 288.34));
`;

const HeaderLeftContainer = styled(FlexCenterDiv)`
  display: flex;
  gap: 0.75rem;
`;

const HeaderRightContainer = styled(FlexCenterDiv)`
  display: flex;
  gap: 0.75rem;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  user-select: none;
`;

const HeaderIconContainer = styled.div`
  position: relative;
`;

const HandIconContainer = styled(motion.div)`
  position: absolute;
  top: -8px;
  left: 12px;
`;
