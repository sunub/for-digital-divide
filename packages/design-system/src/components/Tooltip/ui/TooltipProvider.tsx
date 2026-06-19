"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type TooltipContextValue = {
  isVisible: boolean;
  toggleVisible: () => void;
  triggerElement: HTMLElement | null;
  setTriggerElement: (element: HTMLElement | null) => void;
};

export const TooltipContext = createContext<TooltipContextValue | null>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (context === null) {
    throw new Error("useTooltipContext must be used within a TooltipProvider");
  }
  return context;
};

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isVisible,
      toggleVisible,
      triggerElement,
      setTriggerElement,
    }),
    [isVisible, toggleVisible, triggerElement],
  );

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
}
