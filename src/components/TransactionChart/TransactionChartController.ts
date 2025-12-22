import * as d3 from "d3";
import type { ChartViewMode, DailyData, Scales } from "./types";

const CHART_MARGIN = { top: 20, right: 50, bottom: 30, left: 50 };
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

export class TransactionChartController {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private g: d3.Selection<SVGGElement, unknown, null, undefined>;
  private width: number = 0;
  private height: number = 0;
  private scales: Scales | null = null;
  private data: DailyData[] = [];
  private config: ChartConfig = { viewMode: "ALL" };

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

    this.g = this.svg
      .append("g")
      .attr("transform", `translate(${CHART_MARGIN.left},${CHART_MARGIN.top})`);
  }

  public resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.svg.attr("width", width).attr("height", height);
    this.update(this.data, this.config);
  }

  public update(data: DailyData[], config: ChartConfig) {
    this.data = data;
    this.config = config;

    if (this.width === 0 || this.height === 0 || data.length === 0) return;

    this.g.selectAll("*").remove(); // Clear previous render
    // Note: For better animation performance, we could use D3 join,
    // but for this specific refactor maintaining parity efficiently, clear-and-redraw is acceptable
    // and matches the original React useEffect logic, but now encapsulated.

    const innerWidth = this.width - CHART_MARGIN.left - CHART_MARGIN.right;
    const innerHeight = this.height - CHART_MARGIN.top - CHART_MARGIN.bottom;

    // 1. X Axis
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    // 2. Y Axis Setup
    if (config.viewMode === "ALL") {
      this.drawAllMode(innerWidth, innerHeight, xScale);
    } else {
      this.drawSingleMode(innerWidth, innerHeight, xScale);
    }

    // 3. X Axis Draw
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(
        d3.timeFormat("%m/%d") as (d: Date | { valueOf(): number }) => string,
      )
      .tickSize(0)
      .tickPadding(15);

    this.g
      .append("g")
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

    this.g
      .append("g")
      .attr("class", "grid")
      .call(yAxisGrid)
      .attr("color", "#f3f4f6")
      .select(".domain")
      .remove();

    // Line Generators
    const createLine = (
      yScale: d3.ScaleLinear<number, number>,
      accessor: (d: DailyData) => number,
    ) =>
      d3
        .line<DailyData>()
        .x((d) => xScale(d.date))
        .y((d) => yScale(accessor(d)))
        .curve(d3.curveMonotoneX);

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", COLORS.income)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6)
      .attr(
        "d",
        createLine(yScaleFlow, (d) => d.income),
      );

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", COLORS.expense)
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6)
      .attr(
        "d",
        createLine(yScaleFlow, (d) => d.expense),
      );

    const defs = this.svg.append("defs");
    const gradientId = "balance-gradient-all";
    this.svg.selectAll(`#${gradientId}`).remove();

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

    const balanceArea = d3
      .area<DailyData>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScaleBalance(d.balance))
      .curve(d3.curveMonotoneX);

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", `url(#${gradientId})`)
      .attr("d", balanceArea);

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", COLORS.balance)
      .attr("stroke-width", 2.5)
      .attr(
        "d",
        createLine(yScaleBalance, (d) => d.balance),
      );

    const currentY = yScaleBalance(this.data[this.data.length - 1].balance);
    this.g
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", currentY)
      .attr("y2", currentY)
      .attr("stroke", COLORS.currentLine)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 4")
      .attr("opacity", 0.8);

    this.g
      .append("text")
      .attr("x", innerWidth + 5)
      .attr("y", currentY + 4)
      .text("현재")
      .attr("fill", COLORS.currentLine)
      .attr("font-size", "10px")
      .attr("font-weight", "bold");
  }

  private drawSingleMode(
    innerWidth: number,
    innerHeight: number,
    xScale: d3.ScaleTime<number, number>,
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

    // Grid
    const yAxisGrid = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickFormat(() => "");
    this.g
      .append("g")
      .attr("class", "grid")
      .call(yAxisGrid)
      .attr("color", "#f3f4f6")
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

    const defs = this.svg.select("defs").empty()
      ? this.svg.append("defs")
      : this.svg.select("defs");
    const gradientId = `gradient-${this.config.viewMode}`;
    this.svg.selectAll(`#${gradientId}`).remove();

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
      .attr("stop-color", color)
      .attr("stop-opacity", 0.2);
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", color)
      .attr("stop-opacity", 0.0);

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", `url(#${gradientId})`)
      .attr("d", area);

    this.g
      .append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);
  }

  public getInteractionData(mouseX: number) {
    if (!this.scales || this.data.length === 0) return null;

    const { x: xScale } = this.scales;
    const innerX = mouseX - CHART_MARGIN.left;
    const date = xScale.invert(innerX);
    const bisect = d3.bisector((d: DailyData) => d.date).center;
    const index = bisect(this.data, date);

    if (index >= 0 && index < this.data.length) {
      const d = this.data[index];

      let targetY = 0;
      if (this.config.viewMode === "ALL") {
        targetY = this.scales.yMain(d.balance);
      } else if (this.config.viewMode === "EXPENSE" && this.scales.yMain) {
        targetY = this.scales.yMain(d.expense);
      } else if (this.config.viewMode === "INCOME" && this.scales.yMain) {
        targetY = this.scales.yMain(d.income);
      } else if (this.scales.yMain) {
        targetY = this.scales.yMain(d.balance);
      }

      return {
        data: d,
        x: xScale(d.date) + CHART_MARGIN.left,
        y: targetY + CHART_MARGIN.top,
      };
    }
    return null;
  }

  public destroy() {
    this.svg.remove();
  }
}
