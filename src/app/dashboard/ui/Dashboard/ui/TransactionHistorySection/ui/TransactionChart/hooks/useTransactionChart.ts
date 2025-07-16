'use client';

import * as d3 from 'd3';
import { z } from 'zod/v4';
import { useEffect } from 'react';
import { drawOneMonthChart } from '../utils/drawOneMonthChart';
import { drawMoreThanOneMonthChart } from '../utils/drawMoreThanOneMonthChart';
import { addAxisLabels } from '../utils/addAxisLabels';

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

type TimePeriod = '1month' | '3months' | '6months';

type FilteredData = {
  occurred_at: Date;
  transaction_id: number;
  account_number: number;
  amount: number;
  transaction_type: 'DEPOSIT' | 'WITHDRAWAL' | 'PAYMENT';
  counterparty_account_number?: number | undefined;
  description?: string | undefined;
}[];

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
    d3.select('#transaction-chart-dataviz').selectAll('*').remove();

    const svg = d3
      .select('#transaction-chart-dataviz')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    if (filteredData.length === 0) {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', '#666')
        .text(`${periodLabels[selectedPeriod]}간 거래 데이터가 없습니다.`);
      setIsUpdating(false);
      return;
    }

    const groupKeys: Transaction['transaction_type'][] = ['DEPOSIT', 'WITHDRAWAL'];
    const color = d3.scaleOrdinal<string, string>().domain(groupKeys).range(['#4ecdc4', '#ff6b6b']);

    const x = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.occurred_at) as [Date, Date])
      .range([0, width]);

    if (selectedPeriod === '1month') {
      drawOneMonthChart(filteredData, svg, groupKeys, height, x, color);
    } else {
      drawMoreThanOneMonthChart(filteredData, svg, groupKeys, height, x, color);
    }

    addAxisLabels(svg, width, height, margin);

    const latestDate = d3.max(filteredData, (d) => d.occurred_at);
    const earliestDate = d3.min(filteredData, (d) => d.occurred_at);

    setChartPeriodRange([
      d3.timeFormat('%y.%m.%d')(earliestDate as Date),
      d3.timeFormat('%y.%m.%d')(latestDate as Date),
    ]);
    setIsUpdating(false);
  }, [filteredData, selectedPeriod]);
}
