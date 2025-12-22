import { useShallow } from "zustand/react/shallow";
import Spacer from "@/constants/Spacer";
import { Flex } from "@/shared/ui/Flex";
import { CHART_VIEW_MODES } from "../constants/chartViewMode";
import { TIME_PERIODS } from "../constants/timePeriod";
import { useInteractionStore } from "../store/InteractionStore";
import type { ChartSummary, ChartViewMode } from "../types";
import { getDisplayInfo } from "../utils/getDisplayInfo";
import { ViewSelectButton } from "../ViewSelectButton";
import { PeriodSelectorButton } from "./PeriodSelectorButton";
import { SummaryHeader } from "./SummaryHeader";
import { TransactionLegend } from "./TransactionLengend";
import * as style from "./TransactionSummary.css";
import { TrendIndicator } from "./TrendIndicator";

interface TransactionSummaryProps {
  viewMode: ChartViewMode;
  summary: ChartSummary;
  selectableViewModes?: ChartViewMode[];
}

export function TransactionSummary({
  viewMode,
  summary,
}: TransactionSummaryProps) {
  const { hoverData } = useInteractionStore(
    useShallow((state) => ({
      hoverData: state.hoverData,
    })),
  );
  const displayInfo = getDisplayInfo(viewMode, summary);
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      gap={3}
      className={style.summaryPanel}
    >
      <Flex
        gap={1}
        marginBottom={5}
        padding={0.5}
        backgroundColor={"white"}
        borderRadius={"sm"}
      >
        {CHART_VIEW_MODES.map((mode) => (
          <ViewSelectButton key={mode} currentMode={mode} />
        ))}
      </Flex>

      <Flex
        direction={"column"}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <SummaryHeader hoverData={hoverData} displayInfo={displayInfo} />
        <div className={style.trendIndicatorContainer}>
          {!hoverData ? (
            <TrendIndicator displayInfo={displayInfo} />
          ) : (
            <Spacer axis={"vertical"} size={30} />
          )}
        </div>
      </Flex>

      <div className={style.chartControls}>
        {TIME_PERIODS.map((period) => (
          <PeriodSelectorButton key={period} period={period} />
        ))}
      </div>
      {viewMode === "ALL" && <TransactionLegend />}
    </Flex>
  );
}
