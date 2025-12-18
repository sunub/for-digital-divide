import * as d3 from "d3";
import { z } from "zod/v4";

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

type GroupedTransaction = {
  type: (typeof TRNASACTION_CODES)[number];
  transactions: Transaction[];
};

type FilteredData = {
  occurred_at: Date;
  transaction_id: number;
  account_number: number;
  amount: number;
  transaction_type: "DEPOSIT" | "WITHDRAWAL" | "PAYMENT";
  counterparty_account_number?: number | undefined;
  description?: string | undefined;
}[];

export function drawOneMonthChart(
  filteredData: FilteredData,
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  groupKeys: (typeof TRNASACTION_CODES)[number][],
  height: number,
  x: d3.ScaleTime<number, number>,
  color: d3.ScaleOrdinal<string, string>,
) {
  const group: GroupedTransaction[] = Array.from(
    d3.group(filteredData, (d) => d.transaction_type),
  )
    .filter((d) => groupKeys.includes(d[0]))
    .map(([type, transactions]) => ({
      type,
      transactions: transactions.sort(
        (a, b) => a.occurred_at.getTime() - b.occurred_at.getTime(),
      ),
    }));

  const amounts = filteredData
    .filter((d) => groupKeys.includes(d.transaction_type))
    .map((d) => d.amount);
  if (amounts.length === 0) amounts.push(0);

  const minAmount = d3.min(amounts) || 0;
  const maxAmount = d3.max(amounts) || 0;
  const y = d3
    .scaleLinear()
    .domain([minAmount * 0.95, maxAmount * 1.05])
    .nice()
    .range([height, 0]);

  const timeDayEvery = d3.timeDay.every(3);
  if (!timeDayEvery) {
    throw new Error("d3.timeDay.every(3) should not be null");
  }
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(timeDayEvery)
        .tickFormat((domainValue) => {
          const date = domainValue as Date;
          return d3.timeFormat("%m/%d")(date);
        }),
    )
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");

  svg.append("g").call(
    d3
      .axisLeft(y)
      .ticks(8)
      .tickFormat((d) => `${((d as number) / 10000).toFixed(0)}만원`),
  );

  const line = d3
    .line<Transaction>()
    .x((d) => x(d.occurred_at as Date))
    .y((d) => y(d.amount))
    .curve(d3.curveMonotoneX);

  svg
    .selectAll(".line")
    .data(group)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.transactions))
    .attr("fill", "none")
    .attr("stroke", (d) => color(d.type))
    .attr("stroke-width", 3);

  group.forEach((groupData) => {
    svg
      .selectAll(`.dots-${groupData.type}`)
      .data(groupData.transactions)
      .enter()
      .append("circle")
      .attr("class", `dots-${groupData.type}`)
      .attr("cx", (d) => x(d.occurred_at as Date))
      .attr("cy", (d) => y(d.amount))
      .attr("r", 4)
      .attr("fill", color(groupData.type))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseover", (event, d) => {
        d3.select("body").selectAll(".tooltip").remove();
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0,0,0,0.8)")
          .style("color", "white")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("pointer-events", "none")
          .style("font-size", "12px");

        // [수정됨] 툴팁에 표시될 거래 유형 텍스트를 동적으로 변경합니다.
        const typeLabel =
          d.transaction_type === "DEPOSIT"
            ? "입금"
            : d.transaction_type === "WITHDRAWAL"
              ? "출금"
              : "결제";

        tooltip
          .html(
            `<b>날짜:</b> ${d3.timeFormat("%Y년 %m월 %d일")(d.occurred_at as Date)}<br><b>시간:</b> ${d3.timeFormat(
              "%H시 %M분",
            )(
              d.occurred_at as Date,
            )}<br><b>금액:</b> ${d.amount.toLocaleString()}원<br><b>유형:</b> ${typeLabel}<br><b>내용:</b> ${
              d.description || "N/A"
            }`,
          )
          .style("left", `${event.pageX + 15}px`)
          .style("top", `${event.pageY - 15}px`);
      })
      .on("mouseout", () => d3.selectAll(".tooltip").remove());
  });
}
