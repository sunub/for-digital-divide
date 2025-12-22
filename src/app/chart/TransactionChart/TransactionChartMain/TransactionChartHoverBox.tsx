import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { useInteractionStore } from "../../store/InteractionStore";
import type { ChartViewMode } from "../../types";
import { COLORS } from "../constants/colors";
import * as style from "./TransactionChartHoverBox.css";

interface TransactionChartHoverBoxProps {
  viewMode: ChartViewMode;
}

export function TransactionChartHoverBox({
  viewMode,
}: TransactionChartHoverBoxProps) {
  const { hoverData, hoverPos } = useInteractionStore();

  if (!hoverData || !hoverPos) return null;

  const isRightSide = hoverPos.x > 300;

  const variant =
    viewMode === "ALL"
      ? "balance"
      : viewMode === "INCOME"
        ? "income"
        : viewMode === "EXPENSE"
          ? "expense"
          : "balance";

  return (
    <div
      className={style.container}
      style={assignInlineVars({
        [style.xVar]: `${hoverPos.x}px`,
        [style.yVar]: `${hoverPos.y}px`,
      })}
    >
      {/* Cursor Line */}
      <div className={style.cursorLine} />

      {/* Point */}
      <div className={style.point({ variant })} />

      {/* Tooltip */}
      <div
        className={clsx(
          style.tooltipContainer,
          isRightSide ? style.tooltipRight : style.tooltipLeft,
        )}
      >
        <div className={style.tooltipDate}>
          {hoverData.date.toLocaleDateString()}
        </div>

        <div className={style.tooltipRow}>
          <span
            className={style.tooltipLabel}
            style={{ color: COLORS.expense }}
          >
            지출
          </span>
          <span className={style.tooltipValue}>
            {hoverData.expense.toLocaleString()}원
          </span>
        </div>
        <div className={style.tooltipRow}>
          <span className={style.tooltipLabel} style={{ color: COLORS.income }}>
            수입
          </span>
          <span className={style.tooltipValue}>
            {hoverData.income.toLocaleString()}원
          </span>
        </div>
        <hr style={{ margin: "6px 0", borderTop: "1px solid #eee" }} />
        <div className={style.tooltipRow}>
          <span
            className={style.tooltipLabel}
            style={{ fontWeight: "bold", color: COLORS.balance }}
          >
            잔액
          </span>
          <span className={style.tooltipValue}>
            {hoverData.balance.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
