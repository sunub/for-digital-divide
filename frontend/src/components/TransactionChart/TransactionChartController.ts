import * as d3 from "d3";
import { CHART_MARGIN } from "./constants/chartLayout";
import type { ChartViewMode, DailyData, Scales } from "./types";
import { getInteractionData } from "./utils/interactionMath";

const COLORS = {
  balance: "#3b82f6",
  income: "#22c55e",
  expense: "#ef4444",
  grid: "#e5e7eb",
  text: "#6b7280",
  currentLine: "#f43f5e",
};

type ChartConfig = {
  viewMode: ChartViewMode;
};

type UpdateOptions = {
  animate?: boolean;
};

export class TransactionChartController {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private width: number = 0;
  private height: number = 0;
  private scales: Scales | null = null;
  private data: DailyData[] = [];
  private config: ChartConfig = { viewMode: "ALL" };

  private axisGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private chartGroup: d3.Selection<SVGGElement, unknown, null, undefined>;
  private gridGroup: d3.Selection<SVGGElement, unknown, null, undefined>;

  constructor(container: HTMLElement) {
    this.svg = d3
      .select(container)
      .append("svg")
      .style("width", "100%")
      .style("height", "100%")
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0")
      .style("overflow", "visible");

    const mainGroup = this.svg
      .append("g")
      .attr("transform", `translate(${CHART_MARGIN.left},${CHART_MARGIN.top})`);

    this.gridGroup = mainGroup.append("g").attr("class", "grid-layer");
    this.chartGroup = mainGroup.append("g").attr("class", "chart-layer");
    this.axisGroup = mainGroup.append("g").attr("class", "axis-layer");
  }

  public resize(width: number, height: number) {
    if (this.width === width && this.height === height) {
      return;
    }

    this.width = width;
    this.height = height;
    this.svg.attr("width", width).attr("height", height);
    this.update(this.data, this.config, { animate: false });
  }

  public update(
    data: DailyData[],
    config: ChartConfig,
    options: UpdateOptions = {},
  ) {
    this.data = data;
    this.config = config;
    const animate = options.animate ?? true;

    if (this.width === 0 || this.height === 0 || data.length === 0) {
      return;
    }

    const innerWidth = this.width - CHART_MARGIN.left - CHART_MARGIN.right;
    const innerHeight = this.height - CHART_MARGIN.top - CHART_MARGIN.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    if (config.viewMode === "ALL") {
      this.drawAllMode(innerWidth, innerHeight, xScale, animate);
    } else {
      this.drawSingleMode(innerWidth, innerHeight, xScale, animate);
    }

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(
        d3.timeFormat("%m/%d") as (d: Date | { valueOf(): number }) => string,
      )
      .tickSize(0)
      .tickPadding(15);
    this.axisGroup
      .selectAll<SVGSVGElement, unknown>(".axis-x")
      .data([null])
      .join(
        (enter) => enter.append("g").attr("class", "axis-x"),
        (update) => update,
      )
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("color", "#9ca3af")
      .select(".domain")
      .remove();
  }

  private drawAllMode(
    innerWidth: number,
    innerHeight: number,
    xScale: d3.ScaleTime<number, number>,
    animate: boolean,
  ) {
    const balanceExtent = d3.extent(this.data, (d) => d.balance) as [
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
        d3.max(this.data, (d) => d.income) || 0,
        d3.max(this.data, (d) => d.expense) || 0,
      ) || 10000;
    const yScaleFlow = d3
      .scaleLinear()
      .domain([0, maxFlow * 1.2])
      .range([innerHeight, 0]);

    this.scales = { x: xScale, yMain: yScaleBalance, ySecondary: yScaleFlow };

    const yAxisGrid = d3
      .axisLeft(yScaleBalance)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickFormat(() => "");

    this.gridGroup
      .selectAll<SVGGElement, unknown>(".grid-y")
      .data([null])
      .join(
        (enter) => enter.append("g").attr("class", "grid grid-y"),
        (update) => update,
      )
      .attr("color", "#f3f4f6")
      .call(yAxisGrid)
      .select(".domain")
      .remove();

    const createLine = (
      yScale: d3.ScaleLinear<number, number>,
      accessor: (d: DailyData) => number,
    ) =>
      d3
        .line<DailyData>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(accessor(d)))
        .curve(d3.curveMonotoneX);

    const incomeLine = this.chartGroup
      .selectAll<SVGGElement, unknown>(".line-income")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "line-income").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", "none")
      .attr("stroke", COLORS.income)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    if (animate) {
      incomeLine
        .transition()
        .duration(750)
        .attr(
          "d",
          createLine(yScaleFlow, (d) => d.income),
        )
        .attr("opacity", 1);
    } else {
      incomeLine
        .attr(
          "d",
          createLine(yScaleFlow, (d) => d.income),
        )
        .attr("opacity", 1);
    }

    const expenseLine = this.chartGroup
      .selectAll(".line-expense")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "line-expense").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", "none")
      .attr("stroke", COLORS.expense)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    if (animate) {
      expenseLine
        .transition()
        .duration(750)
        .attr(
          "d",
          createLine(yScaleFlow, (d) => d.expense),
        )
        .attr("opacity", 1);
    } else {
      expenseLine
        .attr(
          "d",
          createLine(yScaleFlow, (d) => d.expense),
        )
        .attr("opacity", 1);
    }

    const gradientId = "balance-gradient-all";
    if (this.svg.select(`#${gradientId}`).empty()) {
      const defs = this.svg.append("defs").empty()
        ? this.svg.append("defs")
        : this.svg.select("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
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
    }

    const balanceArea = d3
      .area<DailyData>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScaleBalance(d.balance))
      .curve(d3.curveMonotoneX);

    const balanceAreaPath = this.chartGroup
      .selectAll(".area-balance")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "area-balance").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", `url(#${gradientId})`);

    if (animate) {
      balanceAreaPath
        .transition()
        .duration(750)
        .attr("d", balanceArea)
        .attr("opacity", 1);
    } else {
      balanceAreaPath.attr("d", balanceArea).attr("opacity", 1);
    }

    const balanceLine = this.chartGroup
      .selectAll(".line-balance")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "line-balance").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", "none")
      .attr("stroke", COLORS.balance)
      .attr("stroke-width", 2.5);

    if (animate) {
      balanceLine
        .transition()
        .duration(750)
        .attr(
          "d",
          createLine(yScaleBalance, (d) => d.balance),
        )
        .attr("opacity", 1);
    } else {
      balanceLine
        .attr(
          "d",
          createLine(yScaleBalance, (d) => d.balance),
        )
        .attr("opacity", 1);
    }

    const currentY = yScaleBalance(this.data[this.data.length - 1].balance);

    const currentLine = this.chartGroup
      .selectAll(".current-line")
      .data([currentY])
      .join(
        (enter) =>
          enter.append("line").attr("class", "current-line").attr("opacity", 0),
        (update) => update,
        (exit) => exit.remove(),
      )
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("stroke", COLORS.currentLine)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4");

    if (animate) {
      currentLine
        .transition()
        .duration(750)
        .attr("y1", currentY)
        .attr("y2", currentY)
        .attr("opacity", 0.8);
    } else {
      currentLine
        .attr("y1", currentY)
        .attr("y2", currentY)
        .attr("opacity", 0.8);
    }

    const currentText = this.chartGroup
      .selectAll(".current-text")
      .data([currentY])
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("class", "current-text")
            .attr("opacity", 0)
            .text("현재"),
        (update) => update,
        (exit) => exit.remove(),
      )
      .attr("x", innerWidth + 5)
      .attr("fill", COLORS.currentLine)
      .attr("font-size", "10px")
      .attr("font-weight", "bold");

    if (animate) {
      currentText
        .transition()
        .duration(750)
        .attr("y", currentY + 4)
        .attr("opacity", 1);
    } else {
      currentText.attr("y", currentY + 4).attr("opacity", 1);
    }

    this.chartGroup.selectAll(".area-single").data([]).join("path").remove();
    this.chartGroup.selectAll(".line-single").data([]).join("path").remove();
  }

  private drawSingleMode(
    innerWidth: number,
    innerHeight: number,
    xScale: d3.ScaleTime<number, number>,
    animate: boolean,
  ) {
    let dataAccessor: (d: DailyData) => number;
    let color: string;

    if (this.config.viewMode === "EXPENSE") {
      dataAccessor = (d) => d.expense;
      color = COLORS.expense;
    } else if (this.config.viewMode === "INCOME") {
      dataAccessor = (d) => d.income;
      color = COLORS.income;
    } else {
      dataAccessor = (d) => d.balance;
      color = COLORS.balance;
    }

    let domain: [number, number];
    if (this.config.viewMode === "BALANCE") {
      const extent = d3.extent(this.data, dataAccessor) as [number, number];
      const padding = (extent[1] - extent[0]) * 0.1;
      domain = [extent[0] - padding, extent[1] + padding];
    } else {
      const maxVal = d3.max(this.data, dataAccessor) || 10000;
      domain = [0, maxVal * 1.1];
    }

    const yScale = d3.scaleLinear().domain(domain).range([innerHeight, 0]);
    this.scales = { x: xScale, yMain: yScale };

    const yAxisGrid = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickFormat(() => "");

    this.gridGroup
      .selectAll<SVGSVGElement, unknown>(".grid-y")
      .data([null])
      .join(
        (enter) => enter.append("g").attr("class", "grid grid-y"),
        (update) => update,
      )
      .attr("color", "#f3f4f6")
      .call(yAxisGrid)
      .select(".domain")
      .remove();

    const line = d3
      .line<DailyData>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(dataAccessor(d)))
      .curve(d3.curveMonotoneX);

    const area = d3
      .area<DailyData>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(dataAccessor(d)))
      .curve(d3.curveMonotoneX);

    const gradientId = `gradient-${this.config.viewMode}`;
    if (this.svg.select(`#${gradientId}`).empty()) {
      const defs = this.svg.select("defs").empty()
        ? this.svg.append("defs")
        : this.svg.select("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient.selectAll("stop").remove();
      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.2);
      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.0);
    } else {
      const gradient = this.svg.select(`#${gradientId}`);
      gradient.select("stop:first-child").attr("stop-color", color);
      gradient.select("stop:last-child").attr("stop-color", color);
    }

    const singleArea = this.chartGroup
      .selectAll(".area-single")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "area-single").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", `url(#${gradientId})`);

    if (animate) {
      singleArea.transition().duration(750).attr("d", area).attr("opacity", 1);
    } else {
      singleArea.attr("d", area).attr("opacity", 1);
    }

    const singleLine = this.chartGroup
      .selectAll(".line-single")
      .data([this.data])
      .join(
        (enter) =>
          enter.append("path").attr("class", "line-single").attr("opacity", 0),
        (update) => update,
        (exit) => exit.transition().duration(300).attr("opacity", 0).remove(),
      )
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2);

    if (animate) {
      singleLine.transition().duration(750).attr("d", line).attr("opacity", 1);
    } else {
      singleLine.attr("d", line).attr("opacity", 1);
    }

    this.chartGroup.selectAll(".line-income").data([]).join("path").remove();
    this.chartGroup.selectAll(".line-expense").data([]).join("path").remove();
    this.chartGroup.selectAll(".line-balance").data([]).join("path").remove();
    this.chartGroup.selectAll(".area-balance").data([]).join("path").remove();
    this.chartGroup.selectAll(".current-line").data([]).join("path").remove();
    this.chartGroup.selectAll(".current-text").data([]).join("text").remove();
  }

  public getInteractionData(mouseX: number) {
    return getInteractionData({
      data: this.data,
      scales: this.scales,
      mouseX,
      viewMode: this.config.viewMode,
      marginLeft: CHART_MARGIN.left,
      marginTop: CHART_MARGIN.top,
    });
  }

  public destroy() {
    this.svg.remove();
  }
}
