export function addAxisLabels(
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
) {
  svg
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2}, ${height + margin.bottom - 10})`,
    )
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", "#666")
    .text("거래 날짜");
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", "#666")
    .text("거래 금액 (만원)");
}
