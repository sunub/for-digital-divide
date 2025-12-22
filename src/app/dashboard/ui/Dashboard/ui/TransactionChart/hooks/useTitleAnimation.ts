import * as d3 from "d3";
import { useEffect } from "react";

const WIDTH = 100;
const HEIGHT = 38;
const MARGIN = { top: 10, right: 0, bottom: 0, left: 0 };
const TITLE_SVG_DATA = [
  { index: 50, value: 120 },
  { index: 100, value: 180 },
  { index: 150, value: 230 },
  { index: 200, value: 150 },
  { index: 250, value: 280 },
  { index: 300, value: 210 },
  { index: 350, value: 220 },
  { index: 400, value: 260 },
  { index: 450, value: 170 },
];

export function useTitleAnimation(
  chartRef: React.RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    if (!chartRef || !chartRef.current) {
      return;
    }

    const chartHeight = HEIGHT - MARGIN.top;
    const padding = 10;
    const duration = 1250;

    const svgRoot = d3.select(chartRef.current);
    svgRoot.selectAll("*").remove();

    const svg = svgRoot
      .append("svg")
      .attr("width", WIDTH + MARGIN.left + MARGIN.right)
      .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(TITLE_SVG_DATA, (d) => d.index) as [number, number])
      .range([padding, WIDTH - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(TITLE_SVG_DATA, (d) => d.value) as number])
      .range([chartHeight, 0]);

    const path = svg
      .append("path")
      .datum(TITLE_SVG_DATA)
      .attr("fill", "none")
      .attr(
        "stroke",
        "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
      )
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line<{ index: number; value: number }>()
          .x((d) => xScale(d.index))
          .y((d) => yScale(d.value)),
      );

    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    svg
      .append("g")
      .selectAll("dot")
      .data(TITLE_SVG_DATA)
      .join("circle")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 3)
      .attr("fill", "white")
      .attr(
        "stroke",
        "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
      )
      .attr("stroke-width", 1.75)
      .attr("opacity", 0)
      .transition()
      .delay((_, i) => (i / (TITLE_SVG_DATA.length - 1)) * duration)
      .duration(300)
      .attr("opacity", 1);
  }, [chartRef]);
}
