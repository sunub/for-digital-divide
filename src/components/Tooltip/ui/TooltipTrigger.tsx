import { useState } from 'react';
import { useTooltipToggle } from '../hooks/useTooltipToggle';

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { isVisible, handleToggle } = useTooltipToggle();

  function handleTrigger() {
    handleToggle();
  }

  return (
    <div
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
