import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { DisplayInfo } from "../../types";
import * as style from "./TransactionSummary.css";

interface TrendIndicatorProps {
  displayInfo: DisplayInfo;
}
export function TrendIndicator({ displayInfo }: TrendIndicatorProps) {
  return (
    <div className={style.trendIndicator} style={{ marginTop: "8px" }}>
      <span
        className={style.trendIndicatorSign}
        style={assignInlineVars({
          [style.trendIndicatorColorVar]: displayInfo.color,
        })}
      >
        {displayInfo.change > 0 ? "▲" : "▼"}{" "}
        {Math.abs(displayInfo.change).toFixed(1)}%
      </span>
      <span className={style.trendLabel}>{displayInfo.trendLabel}</span>
    </div>
  );
}
