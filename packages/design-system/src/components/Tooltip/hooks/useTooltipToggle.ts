import { useCallback, useContext } from "react";
import { TooltipContext } from "../ui/TooltipProvider";

export function useTooltipToggle() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("useTooltipToggle must be used within a TooltipProvider");
  }
  const { isVisible, toggleVisible } = context;
  const handleToggle = useCallback(() => {
    toggleVisible();
  }, [toggleVisible]);

  return {
    isVisible,
    handleToggle,
  };
}
