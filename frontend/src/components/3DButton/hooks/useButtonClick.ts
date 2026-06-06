import { useEffect } from "react";
import useToggle from "@/shared/hooks/use-toggle";

export function useButtonClick(
  defaultValue: boolean = false,
): [boolean, () => void] {
  const [isClick, toggleClick] = useToggle(defaultValue);

  useEffect(() => {
    if (isClick) {
      const timeout = setTimeout(() => {
        toggleClick();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isClick, toggleClick]);

  return [isClick, toggleClick];
}
