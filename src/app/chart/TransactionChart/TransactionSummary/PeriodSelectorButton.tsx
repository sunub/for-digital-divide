import clsx from "clsx";
import { type ComponentProps, type MouseEvent, useCallback } from "react";
import type { TimePeriod } from "../../types";
import { useTransactionContext } from "../TransactionProvider";
import * as style from "./PeriodSelectorButton.css";

interface PeriodSelectorButtonProps extends ComponentProps<"button"> {
  period: TimePeriod;
}

export function PeriodSelectorButton({ period }: PeriodSelectorButtonProps) {
  const { selectedPeriod, setSelectedPeriod } = useTransactionContext();
  const periodMap: Record<TimePeriod, string> = {
    "1month": "1M",
    "3months": "3M",
    "6months": "6M",
  };

  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setSelectedPeriod(period);
    },
    [period, setSelectedPeriod],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation();
        setSelectedPeriod(period);
      }
    },
    [period, setSelectedPeriod],
  );

  return (
    <button
      type="button"
      className={clsx(
        style.periodButton,
        selectedPeriod === period && style.activePeriodButton,
      )}
      tabIndex={0}
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
    >
      {periodMap[period]}
    </button>
  );
}
