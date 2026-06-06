"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import * as style from "./Tooltip.css";

type TooltipContextValue = {
  isVisible: boolean;
  toggleVisible: () => void;
  rootContainerRef: React.RefObject<HTMLElement | null>;
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
  const rootContainerRef = useRef<HTMLDivElement | null>(null);
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
      rootContainerRef,
      triggerElement,
      setTriggerElement,
    }),
    [isVisible, toggleVisible, triggerElement],
  );

  return (
    <TooltipContext.Provider value={value}>
      <div ref={rootContainerRef} className={style.tooltipProvider}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
}
