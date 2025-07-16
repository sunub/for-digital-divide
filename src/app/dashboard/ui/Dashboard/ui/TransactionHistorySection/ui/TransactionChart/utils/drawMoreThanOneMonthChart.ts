import * as d3 from 'd3';
import { z } from 'zod/v4';

const TRNASACTION_CODES = ['DEPOSIT', 'WITHDRAWAL', 'PAYMENT'] as const;

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

type MonthlySummary = {
  month: Date;
  totalAmount: number;
};

type GroupedMonthlySummary = {
  type: (typeof TRNASACTION_CODES)[number];
  summaries: MonthlySummary[];
};

type FilteredData = {
  occurred_at: Date;
  transaction_id: number;
  account_number: number;
  amount: number;
  transaction_type: 'DEPOSIT' | 'WITHDRAWAL' | 'PAYMENT';
  counterparty_account_number?: number | undefined;
  description?: string | undefined;
}[];

export function drawMoreThanOneMonthChart(
  filteredData: FilteredData,
  svg: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  groupKeys: (typeof TRNASACTION_CODES)[number][],
  height: number,
  x: d3.ScaleTime<number, number>,
  color: d3.ScaleOrdinal<string, string>,
) {
  const monthlyData: GroupedMonthlySummary[] = [];
  const allMonthlyAmounts: number[] = [];

  for (const type of groupKeys) {
    const typeTransactions = filteredData.filter((d) => d.transaction_type === type);
    if (typeTransactions.length === 0) continue;

    const summary = d3.rollup(
      typeTransactions,
      (v) => d3.sum(v, (d) => d.amount),
      (d) => d3.timeFormat('%Y-%m')(d.occurred_at),
    );

    const summaries: MonthlySummary[] = Array.from(summary, ([monthStr, totalAmount]) => {
      allMonthlyAmounts.push(totalAmount);
      return { month: d3.timeParse('%Y-%m')(monthStr) as Date, totalAmount };
    }).sort((a, b) => a.month.getTime() - b.month.getTime());

    monthlyData.push({ type, summaries });
  }

  const maxAmount = d3.max(allMonthlyAmounts) || 0;
  const y = d3
    .scaleLinear()
    .domain([0, maxAmount * 1.05])
    .nice()
    .range([height, 0]);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(d3.timeMonth.every(1)!)
        .tickFormat((domainValue) => {
          const date = domainValue as Date;
          return d3.timeFormat('%y/%m')(date);
        }),
    )
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)');

  const line = d3
    .line<MonthlySummary>()
    .x((d) => x(d.month))
    .y((d) => y(d.totalAmount))
    .curve(d3.curveMonotoneX);

  monthlyData.forEach((group) => {
    svg
      .append('path')
      .datum(group.summaries)
      .attr('fill', 'none')
      .attr('stroke', color(group.type))
      .attr('stroke-width', 3)
      .attr('d', line);
    svg
      .selectAll(`.dots-${group.type}`)
      .data(group.summaries)
      .enter()
      .append('circle')
      .attr('class', `dots-${group.type}`)
      .attr('cx', (d) => x(d.month))
      .attr('cy', (d) => y(d.totalAmount))
      .attr('r', 5)
      .attr('fill', color(group.type))
      .on('mouseover', (event, d) => {
        d3.select('body').selectAll('.tooltip').remove();
        const tooltip = d3
          .select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0,0,0,0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('pointer-events', 'none')
          .style('font-size', '12px');
        tooltip
          .html(`<b>${d3.timeFormat('%Y년 %m월')(d.month)}</b><br>월 합계: ${d.totalAmount.toLocaleString()}원`)
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 15}px`);
      })
      .on('mouseout', () => d3.selectAll('.tooltip').remove());
  });
}
