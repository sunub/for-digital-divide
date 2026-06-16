import { ButtonGroup } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import Spacer from "@/constants/Spacer";
import { CHART_VIEW_MODES } from "../constants/chartViewMode";
import { TIME_PERIODS } from "../constants/timePeriod";
import { useInteractionStore } from "../store/InteractionStore";
import { useTransactionViewMode } from "../TransactionProvider";
import type { ChartSummary } from "../types";
import { getDisplayInfo } from "../utils/getDisplayInfo";
import { useRenderCounter } from "../utils/transactionChartMetrics";
import { ViewSelectButton } from "../ViewSelectButton";
import { PeriodSelectorButton } from "./PeriodSelectorButton";
import { SummaryHeader } from "./SummaryHeader";
import { TransactionLegend } from "./TransactionLengend";
import * as style from "./TransactionSummary.css";
import { TrendIndicator } from "./TrendIndicator";

interface TransactionSummaryProps {
  summary: ChartSummary;
}

export function TransactionSummary({ summary }: TransactionSummaryProps) {
  const { viewMode } = useTransactionViewMode();

  useRenderCounter("TransactionSummary", {
    viewMode,
    summaryBalance: summary.currentBalance,
    expenseTotal: summary.totalExpense,
    incomeTotal: summary.totalIncome,
  });

  const hasHoverData = useInteractionStore((state) => state.hoverData !== null);
  const displayInfo = getDisplayInfo(viewMode, summary);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      gap={3}
      className={style.summaryPanel}
    >
      <ButtonGroup
        width={"full"}
        marginBottom={5}
        padding={0.5}
        backgroundColor={"white"}
        borderRadius={"sm"}
      >
        {CHART_VIEW_MODES.map((mode) => (
          <ViewSelectButton key={mode} currentMode={mode} />
        ))}
      </ButtonGroup>

      <Flex
        direction={"column"}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <SummaryHeader displayInfo={displayInfo} />
        <div className={style.trendIndicatorContainer}>
          {!hasHoverData ? (
            <TrendIndicator displayInfo={displayInfo} />
          ) : (
            <Spacer axis={"vertical"} size={30} />
          )}
        </div>
      </Flex>

      <ButtonGroup width={"full"} justifyContent={"center"}>
        {TIME_PERIODS.map((period) => (
          <PeriodSelectorButton key={period} period={period} />
        ))}
      </ButtonGroup>
      {viewMode === "ALL" && <TransactionLegend />}
    </Flex>
  );
}
