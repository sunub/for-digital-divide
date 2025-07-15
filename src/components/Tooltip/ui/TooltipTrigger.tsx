import { useRef, useEffect, useState } from 'react';
import { useTooltipToggle } from '../hooks/useTooltipToggle';
import { useTooltipContext } from './TooltipProvider';

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { isVisible, handleToggle } = useTooltipToggle();
  const { setTriggerRef } = useTooltipContext();

  useEffect(() => {
    if (buttonRef.current) {
      setTriggerRef(buttonRef);
    }
  }, [setTriggerRef]);

  function handleTrigger() {
    handleToggle();
  }

  return (
    <div
      ref={buttonRef}
      className="tooltip-trigger"
      onMouseEnter={() => {
        if (timer) {
          clearTimeout(timer);
        }
        setTimer(setTimeout(handleTrigger, 100));
      }}
      onMouseLeave={() => {
        if (timer) {
          clearTimeout(timer);
        }
        if (isVisible) {
          handleTrigger();
        }
      }}
    >
      {children}
    </div>
  );
}
