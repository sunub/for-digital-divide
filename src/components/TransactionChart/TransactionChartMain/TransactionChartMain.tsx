import { useTransactionChart } from "../hooks/useTransactionChart";
import type { ChartViewMode, DailyData } from "../types";
import { TransactionChartHoverBox } from "./TransactionChartHoverBox";
import * as style from "./TransactionChartMain.css";

interface TransactionChartMainProps {
  viewMode: ChartViewMode;
  dailyData: DailyData[];
}

export function TransactionChartMain({
  viewMode,
  dailyData,
}: TransactionChartMainProps) {
  const { containerRef, handleMouseMove, handleMouseLeave } =
    useTransactionChart({ viewMode, data: dailyData });

  return (
    <section
      aria-label="메인 차트 영역"
      className={style.chartGraphWrapper}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {dailyData.length > 0 ? (
        <TransactionChartHoverBox viewMode={viewMode} />
      ) : (
        <div className={style.emptyState}>데이터가 부족합니다.</div>
      )}
      <div id={"transaction-chart-main-bottom"} />
    </section>
  );
}
