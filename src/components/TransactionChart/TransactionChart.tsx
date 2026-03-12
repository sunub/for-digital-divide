"use client";

import clsx from "clsx";
import { useMemo } from "react";
import * as style from "./TransactionChart.css";
import { TransactionChartMain } from "./TransactionChartMain/TransactionChartMain";
import { useTransactionSelectedPeriod } from "./TransactionProvider";
import { TransactionSummary } from "./TransactionSummary/TransactionSummary";
import type { Transaction } from "./types";
import { processData } from "./utils/processData";
import { useRenderCounter } from "./utils/transactionChartMetrics";

export function TransactionChart({
  transactionData,
  currentBalance = 0,
}: {
  transactionData: Transaction[];
  currentBalance?: number;
}) {
  const { selectedPeriod } = useTransactionSelectedPeriod();

  useRenderCounter("TransactionChart", {
    selectedPeriod,
    txCount: transactionData.length,
  });

  const { dailyData, summary } = useMemo(() => {
    return processData(transactionData, selectedPeriod, currentBalance);
  }, [transactionData, selectedPeriod, currentBalance]);

  return (
    <div
      className={clsx("transaction-chart-container", style.chartRootContainer)}
    >
      <TransactionSummary summary={summary} />
      <TransactionChartMain dailyData={dailyData} />
    </div>
  );
}
