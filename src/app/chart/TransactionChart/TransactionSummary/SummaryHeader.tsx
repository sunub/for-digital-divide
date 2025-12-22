import type { ChartViewMode, DailyData, DisplayInfo } from "../../types";
import { useTransactionContext } from "../TransactionProvider";
import * as style from "./SummaryHeader.css";

interface SummaryHeaderProps {
  hoverData: DailyData | null;
  displayInfo: DisplayInfo;
}

const classifyHoverData = (viewMode: ChartViewMode, hoverData: DailyData) => {
  return (
    viewMode === "ALL"
      ? hoverData.balance
      : viewMode === "EXPENSE"
        ? hoverData.expense
        : viewMode === "INCOME"
          ? hoverData.income
          : hoverData.balance
  ).toLocaleString();
};

export function SummaryHeader({ hoverData, displayInfo }: SummaryHeaderProps) {
  const { viewMode } = useTransactionContext();

  return (
    <div className={style.summaryHeader}>
      <span className={style.summaryLabel}>{displayInfo.label}</span>
      <h2 className={style.totalAmount}>
        {hoverData
          ? classifyHoverData(viewMode, hoverData)
          : displayInfo.amount.toLocaleString()}
        원
      </h2>
      <div className={style.summaryDataInfo}>
        {hoverData && (
          <span style={{ fontSize: "0.75rem", color: "#888" }}>
            {hoverData.date.toLocaleDateString()} 기준
          </span>
        )}
      </div>
    </div>
  );
}
