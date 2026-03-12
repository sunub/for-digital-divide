"use client";

import * as d3 from "d3";
import { useEffect } from "react";
import { addAxisLabels } from "../utils/addAxisLabels";
import { drawMoreThanOneMonthChart } from "../utils/drawMoreThanOneMonthChart";
import {
  drawOneMonthChart,
  type FilteredData,
  type Transaction,
} from "../utils/drawOneMonthChart";

type TimePeriod = "1month" | "3months" | "6months";

export function useTransactionChart(
  filteredData: FilteredData,
  selectedPeriod: TimePeriod,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setChartPeriodRange: React.Dispatch<React.SetStateAction<string[]>>,
  periodLabels: Record<TimePeriod, string>,
) {
  useEffect(() => {
    setIsUpdating(true);
    d3.select("#transaction-chart-dataviz").selectAll("*").remove();

    const svg = d3
      .select("#transaction-chart-dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    if (filteredData.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", "#666")
        .text(`${periodLabels[selectedPeriod]}간 거래 데이터가 없습니다.`);
      setIsUpdating(false);
      return;
    }

    const groupKeys: Transaction["transaction_type"][] = [
      "DEPOSIT",
      "WITHDRAWAL",
    ];
    const color = d3
      .scaleOrdinal<string, string>()
      .domain(groupKeys)
      .range(["#4ecdc4", "#ff6b6b"]);

    const x = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.occurred_at) as [Date, Date])
      .range([0, width]);

    if (selectedPeriod === "1month") {
      drawOneMonthChart(filteredData, svg, groupKeys, height, x, color);
    } else {
      drawMoreThanOneMonthChart(filteredData, svg, groupKeys, height, x, color);
    }

    addAxisLabels(svg, width, height, margin);

    const latestDate = d3.max(filteredData, (d) => d.occurred_at);
    const earliestDate = d3.min(filteredData, (d) => d.occurred_at);

    setChartPeriodRange([
      d3.timeFormat("%y.%m.%d")(earliestDate as Date),
      d3.timeFormat("%y.%m.%d")(latestDate as Date),
    ]);
    setIsUpdating(false);
  }, [
    filteredData,
    selectedPeriod,
    height,
    margin,
    periodLabels[selectedPeriod],
    setChartPeriodRange,
    setIsUpdating,
    width,
  ]);
}
