'use client';

import styled from 'styled-components';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type TooltipContextValue = {
  isVisible: boolean;
  toggleVisible: () => void;
  rootContainerRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  setTriggerRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
};

export const TooltipContext = createContext<TooltipContextValue | null>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (context === null) {
    throw new Error('useTooltipContext must be used within a TooltipProvider');
  }
  return context;
};

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const rootContainerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const setTriggerRef = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    triggerRef.current = ref.current;
  }, []);

  const value = useMemo(
    () => ({
      isVisible,
      toggleVisible,
      rootContainerRef,
      triggerRef,
      setTriggerRef,
    }),
    [isVisible, toggleVisible, setTriggerRef],
  );

  return (
    <TooltipContext.Provider value={value}>
      <Container ref={rootContainerRef}>{children}</Container>
    </TooltipContext.Provider>
  );
}

const Container = styled.div`
  position: relative;
  z-index: 30;
`;
