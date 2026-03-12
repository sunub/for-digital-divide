import { useTransactionViewMode } from "../TransactionProvider";
import { useInteractionStore } from "../store/InteractionStore";
import type { ChartViewMode, DailyData, DisplayInfo } from "../types";
import * as style from "./SummaryHeader.css";

interface SummaryHeaderProps {
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

export function SummaryHeader({ displayInfo }: SummaryHeaderProps) {
  const { viewMode } = useTransactionViewMode();
  const hoverData = useInteractionStore((state) => state.hoverData);

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
