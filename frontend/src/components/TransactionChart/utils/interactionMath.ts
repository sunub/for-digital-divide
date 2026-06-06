import * as d3 from "d3";
import type { ChartViewMode, DailyData, Scales } from "../types";

export type ChartInteraction = {
  data: DailyData;
  x: number;
  y: number;
};

type GetInteractionDataParams = {
  data: DailyData[];
  scales: Scales | null;
  mouseX: number;
  viewMode: ChartViewMode;
  marginLeft: number;
  marginTop: number;
};

export function getInteractionData({
  data,
  scales,
  mouseX,
  viewMode,
  marginLeft,
  marginTop,
}: GetInteractionDataParams): ChartInteraction | null {
  if (!scales || data.length === 0) return null;

  const { x: xScale } = scales;
  const innerX = mouseX - marginLeft;
  const date = xScale.invert(innerX);
  const bisect = d3.bisector((datum: DailyData) => datum.date).center;
  const index = bisect(data, date);

  if (index < 0 || index >= data.length) {
    return null;
  }

  const datum = data[index];

  let targetY = 0;
  if (viewMode === "ALL") {
    targetY = scales.yMain(datum.balance);
  } else if (viewMode === "EXPENSE") {
    targetY = scales.yMain(datum.expense);
  } else if (viewMode === "INCOME") {
    targetY = scales.yMain(datum.income);
  } else {
    targetY = scales.yMain(datum.balance);
  }

  return {
    data: datum,
    x: xScale(datum.date) + marginLeft,
    y: targetY + marginTop,
  };
}

export function createHoverKey(
  interaction: ChartInteraction,
  viewMode: ChartViewMode,
) {
  return [
    interaction.data.date.getTime(),
    Math.round(interaction.x),
    Math.round(interaction.y),
    viewMode,
  ].join(":");
}
