import * as d3 from "d3";
import type { RefObject } from "react";
import type { D3Objects, DailyData, Scales } from "../../types";
import { COLORS } from "../constants/colors";

export function drawTotalTransactionChart(
  d3Obj: D3Objects,
  dailyData: DailyData[],
  scalesRef: RefObject<Scales>,
) {
  const balanceExtent = d3.extent(dailyData, (d) => d.balance) as [
    number,
    number,
  ];

  const balPadding = (balanceExtent[1] - balanceExtent[0]) * 0.05;
  const yScaleBalance = d3
    .scaleLinear()
    .domain([balanceExtent[0] - balPadding, balanceExtent[1] + balPadding])
    .range([innerHeight, 0]);

  const maxFlow =
    Math.max(
      d3.max(dailyData, (d) => d.income) || 0,
      d3.max(dailyData, (d) => d.expense) || 0,
    ) || 10000;

  const yScaleFlow = d3
    .scaleLinear()
    .domain([0, maxFlow * 1.2])
    .range([innerHeight, 0]);

  scalesRef.current = {
    x: d3Obj.xScale,
    yMain: yScaleBalance,
    ySecondary: yScaleFlow,
  };

  const yAxisGrid = d3
    .axisLeft(yScaleBalance)
    .ticks(5)
    .tickSize(-innerWidth)
    .tickFormat(() => "");

  d3Obj.g
    .append("g")
    .attr("class", "grid")
    .call(yAxisGrid)
    .attr("color", "#f3f4f6")
    .select(".domain")
    .remove();

  const incomeLine = d3
    .line<DailyData>()
    .x((d) => d3Obj.xScale(d.date))
    .y((d) => yScaleFlow(d.income))
    .curve(d3.curveMonotoneX);

  d3Obj.g
    .append("path")
    .datum(dailyData)
    .attr("fill", "none")
    .attr("stroke", COLORS.income)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6)
    .attr("d", incomeLine);

  const expenseLine = d3
    .line<DailyData>()
    .x((d) => d3Obj.xScale(d.date))
    .y((d) => yScaleFlow(d.expense))
    .curve(d3.curveMonotoneX);

  d3Obj.g
    .append("path")
    .datum(dailyData)
    .attr("fill", "none")
    .attr("stroke", COLORS.expense)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6)
    .attr("d", expenseLine);

  const balanceLine = d3
    .line<DailyData>()
    .x((d) => d3Obj.xScale(d.date))
    .y((d) => yScaleBalance(d.balance))
    .curve(d3.curveMonotoneX);

  const defs = d3Obj.svg.append("defs");
  const gradient = defs
    .append("linearGradient")
    .attr("id", "balance-gradient-all")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", COLORS.balance)
    .attr("stop-opacity", 0.1);
  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", COLORS.balance)
    .attr("stop-opacity", 0.0);

  const balanceArea = d3
    .area<DailyData>()
    .x((d) => d3Obj.xScale(d.date))
    .y0(innerHeight)
    .y1((d) => yScaleBalance(d.balance))
    .curve(d3.curveMonotoneX);

  d3Obj.g
    .append("path")
    .datum(dailyData)
    .attr("fill", "url(#balance-gradient-all)")
    .attr("d", balanceArea);

  d3Obj.g
    .append("path")
    .datum(dailyData)
    .attr("fill", "none")
    .attr("stroke", COLORS.balance)
    .attr("stroke-width", 2.5)
    .attr("d", balanceLine);

  const currentY = yScaleBalance(dailyData[dailyData.length - 1].balance);
  d3Obj.g
    .append("line")
    .attr("x1", 0)
    .attr("x2", innerWidth)
    .attr("y1", currentY)
    .attr("y2", currentY)
    .attr("stroke", COLORS.currentLine)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4 4")
    .attr("opacity", 0.8);

  d3Obj.g
    .append("text")
    .attr("x", innerWidth + 5)
    .attr("y", currentY + 4)
    .text("현재")
    .attr("fill", COLORS.currentLine)
    .attr("font-size", "10px")
    .attr("font-weight", "bold");
}
