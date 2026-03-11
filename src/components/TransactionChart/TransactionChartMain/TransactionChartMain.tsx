import { Box, Text } from "@for-digital-divide/design-system";
import { useTransactionChart } from "../hooks/useTransactionChart";
import type { ChartViewMode, DailyData } from "../types";
import { useRenderCounter } from "../utils/transactionChartMetrics";
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
  useRenderCounter("TransactionChartMain", {
    viewMode,
    dataLength: dailyData.length,
  });

  const { containerRef, handleMouseMove, handleMouseLeave } =
    useTransactionChart({ viewMode, data: dailyData });

  return (
    <Box
      as="section"
      aria-label="메인 차트 영역"
      className={style.chartGraphWrapper}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {dailyData.length > 0 ? (
        <TransactionChartHoverBox viewMode={viewMode} />
      ) : (
        <Text
          as="p"
          variant="description"
          alignItems="center"
          justifyContent="center"
          className={style.emptyState}
        >
          데이터가 부족합니다.
        </Text>
      )}
      <div id={"transaction-chart-main-bottom"} />
    </Box>
  );
}
