"use client";

import clsx from "clsx";
import * as d3 from "d3";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useTransactionChart } from "../hooks/useTransactionChart";
import * as style from "./TransactionChart.css";

const TRNASACTION_CODES = ["DEPOSIT", "WITHDRAWAL", "PAYMENT"] as const;

export const TransactionSchema = z.object({
  transaction_id: z.number().int(),
  account_number: z.number().int(),
  amount: z.number().min(0),
  transaction_type: z.enum(TRNASACTION_CODES),
  counterparty_account_number: z.number().int().optional(),
  description: z.string().max(255).optional(),
  occurred_at: z.union([z.string(), z.date()]),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionList = Transaction[];

type TimePeriod = "1month" | "3months" | "6months";

export function TransactionChart({
  transactionData,
}: {
  transactionData: TransactionList;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1month");
  const [isUpdating, setIsUpdating] = useState(false);
  const [chartPeriodRange, setChartPeriodRange] = useState<string[]>([]);

  const margin = { top: 60, right: 140, bottom: 80, left: 80 };
  const width = 1000 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  const periodToMonths = { "1month": 1, "3months": 3, "6months": 6 };
  const periodLabels = {
    "1month": "최근 1개월",
    "3months": "최근 3개월",
    "6months": "최근 6개월",
  };

  //데이터 정제 : 'occurred_at'을 Date 객체로 변환하여 타입 에러 방지
  const sanitizedData = useMemo(() => {
    if (!transactionData) return [];
    return transactionData.map((d) => ({
      ...d,
      occurred_at: new Date(d.occurred_at),
    }));
  }, [transactionData]);

  // 기간 필터링
  const filteredData = useMemo(() => {
    if (sanitizedData.length === 0) return [];
    const latestTransactionDate = d3.max(sanitizedData, (d) => d.occurred_at);
    if (!latestTransactionDate) return [];
    const filterStartDate = new Date(latestTransactionDate);
    filterStartDate.setMonth(
      filterStartDate.getMonth() - periodToMonths[selectedPeriod],
    );
    return sanitizedData.filter(
      (d) =>
        d.occurred_at >= filterStartDate &&
        d.occurred_at <= latestTransactionDate,
    );
  }, [sanitizedData, selectedPeriod]);

  useTransactionChart(
    filteredData,
    selectedPeriod,
    width,
    height,
    margin,
    setIsUpdating,
    setChartPeriodRange,
    periodLabels,
  );

  return (
    <div
      className={clsx("transaction-chart-container", style.chartRootContainer)}
    >
      <div
        className={clsx("chart-controls", style.chartPeriodSelectContainer)}
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <label className={style.chartPeriodLabel} htmlFor="period-select">
          조회 기간:
        </label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as TimePeriod)}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          <option value="1month">최근 1개월</option>
          <option value="3months">최근 3개월</option>
          <option value="6months">최근 6개월</option>
        </select>
        {isUpdating && (
          <span style={{ marginLeft: "10px", color: "#666", fontSize: "12px" }}>
            차트 업데이트 중...
          </span>
        )}
      </div>
      <div className={style.chartPeriodRange}>
        거래 내역 : {`${chartPeriodRange[0]} ~ ${chartPeriodRange[1]}`}
      </div>
      <div
        id="transaction-chart-dataviz"
        style={{ position: "relative" }}
        className={style.chartGraphContainer}
      />
    </div>
  );
}
