import { assignInlineVars } from "@vanilla-extract/dynamic";
import { CHART_VIEW_MODES_MAP } from "./constants/chartViewMode";
import { useTransactionContext } from "./TransactionProvider";
import type { ChartViewMode } from "./types";
import * as style from "./ViewSelectedButton.css";

interface ViewSelectButtonProps {
  currentMode: ChartViewMode;
}

export function ViewSelectButton({ currentMode }: ViewSelectButtonProps) {
  const { viewMode, setViewMode } = useTransactionContext();

  const handleClick = () => {
    setViewMode(currentMode);
    const target = document.getElementById("transaction-chart-main-bottom");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={style.viewSelectedButton}
      style={assignInlineVars({
        [style.boxShadowVar]:
          viewMode === currentMode ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
        [style.colorVar]: viewMode === currentMode ? "#111" : "#888",
        [style.fontWeightVar]: viewMode === currentMode ? "700" : "500",
        [style.backgroundColorVar]:
          viewMode === currentMode ? "white" : "transparent",
      })}
    >
      {CHART_VIEW_MODES_MAP[currentMode]}
    </button>
  );
}
