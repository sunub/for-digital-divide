'use client';

import React from 'react';
import SmallPhone from '@/components/SmallPhone';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowIcon } from '@/icons';
import useToggle from '@/hooks/use-toggle';

interface SmallPhoneProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);
  const smallPhoneProps = {
    isOpen,
    toggleOpen,
  };

  return (
    <div>
      <LinkToAgreeToTerm {...smallPhoneProps} />
    </div>
  );
}

function LinkToAgreeToTerm(props: SmallPhoneProps) {
  const { isOpen } = props;

  return (
    <React.Fragment>
      {!isOpen && (
        <Title>
          <h1>핸드폰을 클릭해주세요!</h1>
          <ArrowIcon />
        </Title>
      )}

      <SmallPhone {...props} />
    </React.Fragment>
  );
}

const Title = styled(motion.div)`
  position: absolute;
  top: 25cqh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  & > h1 {
    font-weight: 700;
    font-size: 2rem;
  }

  & > svg {
    transform: scale(2) rotate(-90deg);
  }
`;
