'use client';

import * as d3 from 'd3';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

// =================================================================
// 타입 정의 (Zod 스키마 기반)
// =================================================================

// 실제 프로젝트의 값으로 대체해야 합니다.
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

// 1개월 보기용 데이터 타입
type GroupedTransaction = {
  type: (typeof TRNASACTION_CODES)[number];
  transactions: Transaction[];
};

// 3, 6개월 보기용 월별 합산 데이터 타입
type MonthlySummary = {
  month: Date;
  totalAmount: number;
};

type GroupedMonthlySummary = {
  type: (typeof TRNASACTION_CODES)[number];
  summaries: MonthlySummary[];
};

type TimePeriod = '1month' | '3months' | '6months';

// =================================================================
// TransactionChart 컴포넌트
// =================================================================

export function TransactionChart({ transactionData }: { transactionData: TransactionList }) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1month');
  const [isUpdating, setIsUpdating] = useState(false);

  const margin = { top: 60, right: 140, bottom: 80, left: 80 };
  const width = 600 - margin.left - margin.right;
  const height = 450 - margin.top - margin.bottom;

  const periodToMonths = { '1month': 1, '3months': 3, '6months': 6 };
  const periodLabels = { '1month': '최근 1개월', '3months': '최근 3개월', '6months': '최근 6개월' };

  // 1. [데이터 정제] 'occurred_at'을 Date 객체로 변환하여 타입 에러 방지
  const sanitizedData = useMemo(() => {
    if (!transactionData) return [];
    return transactionData.map((d) => ({
      ...d,
      occurred_at: new Date(d.occurred_at),
    }));
  }, [transactionData]);

  // 2. [기간 필터링]
  const filteredData = useMemo(() => {
    if (sanitizedData.length === 0) return [];
    const latestTransactionDate = d3.max(sanitizedData, (d) => d.occurred_at);
    if (!latestTransactionDate) return [];
    const filterStartDate = new Date(latestTransactionDate);
    filterStartDate.setMonth(filterStartDate.getMonth() - periodToMonths[selectedPeriod]);
    return sanitizedData.filter((d) => d.occurred_at >= filterStartDate && d.occurred_at <= latestTransactionDate);
  }, [sanitizedData, selectedPeriod]);

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

    const groupKeys: Transaction['transaction_type'][] = ['WITHDRAWAL', 'PAYMENT'];
    const color = d3.scaleOrdinal<string, string>().domain(groupKeys).range(['#ff6b6b', '#4ecdc4']);
    const x = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.occurred_at) as [Date, Date])
      .range([0, width]);

    // =================================================================
    // ✨ [로직 분기] 기간에 따라 다른 데이터 처리 및 렌더링
    // =================================================================

    if (selectedPeriod === '1month') {
      // [1개월 로직] - 개별 거래 내역을 자세히 표시
      const group: GroupedTransaction[] = Array.from(d3.group(filteredData, (d) => d.transaction_type))
        .filter((d) => groupKeys.includes(d[0]))
        .map(([type, transactions]) => ({
          type,
          transactions: transactions.sort((a, b) => a.occurred_at.getTime() - b.occurred_at.getTime()),
        }));

      const amounts = filteredData.filter((d) => groupKeys.includes(d.transaction_type)).map((d) => d.amount);
      if (amounts.length === 0) amounts.push(0);

      const minAmount = d3.min(amounts) || 0;
      const maxAmount = d3.max(amounts) || 0;
      const y = d3
        .scaleLinear()
        .domain([minAmount * 0.95, maxAmount * 1.05])
        .nice()
        .range([height, 0]);

      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeDay.every(3)!)
            .tickFormat((domainValue) => {
              const date = domainValue as Date;
              return d3.timeFormat('%m/%d')(date);
            }),
        )
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');
      svg.append('g').call(
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
        .selectAll('.line')
        .data(group)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('d', (d) => line(d.transactions))
        .attr('fill', 'none')
        .attr('stroke', (d) => color(d.type))
        .attr('stroke-width', 3);

      group.forEach((groupData) => {
        svg
          .selectAll(`.dots-${groupData.type}`)
          .data(groupData.transactions)
          .enter()
          .append('circle')
          .attr('class', `dots-${groupData.type}`)
          .attr('cx', (d) => x(d.occurred_at as Date))
          .attr('cy', (d) => y(d.amount))
          .attr('r', 4)
          .attr('fill', color(groupData.type))
          .attr('stroke', '#fff')
          .attr('stroke-width', 2)
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
              .html(
                `<b>날짜:</b> ${d3.timeFormat('%Y년 %m월 %d일')(d.occurred_at as Date)}<br><b>시간:</b> ${d3.timeFormat('%H시 %M분')(d.occurred_at as Date)}<br><b>금액:</b> ${d.amount.toLocaleString()}원<br><b>유형:</b> ${d.transaction_type === 'WITHDRAWAL' ? '출금' : '결제'}<br><b>내용:</b> ${d.description || 'N/A'}`,
              )
              .style('left', `${event.pageX + 15}px`)
              .style('top', `${event.pageY - 15}px`);
          })
          .on('mouseout', () => d3.selectAll('.tooltip').remove());
      });

      const avgAmount = amounts.length > 0 ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length) : 0;
      const statsText = [
        `총 거래: ${amounts.length}건`,
        `최대 금액: ${maxAmount.toLocaleString()}원`,
        `최소 금액: ${minAmount.toLocaleString()}원`,
        `평균 금액: ${avgAmount.toLocaleString()}원`,
      ];
      svg
        .append('g')
        .attr('transform', `translate(${width + 20}, ${height - 280})`)
        .selectAll('text')
        .data(statsText)
        .enter()
        .append('text')
        .attr('y', (d, i) => i * 15)
        .style('font-size', '11px')
        .style('fill', '#666')
        .text((d) => d);
    } else {
      // [3개월, 6개월 로직] - 월별로 합산하여 추세 표시
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

      const minAmount = d3.min(allMonthlyAmounts) || 0;
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
      svg.append('g').call(
        d3
          .axisLeft(y)
          .ticks(8)
          .tickFormat((d) => `${((d as number) / 10000).toFixed(0)}만원`),
      );

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

      const avgAmount =
        allMonthlyAmounts.length > 0
          ? Math.round(allMonthlyAmounts.reduce((a, b) => a + b, 0) / allMonthlyAmounts.length)
          : 0;
      const statsText = [
        `월 최대 금액: ${maxAmount.toLocaleString()}원`,
        `월 최소 금액: ${minAmount.toLocaleString()}원`,
        `월 평균 금액: ${avgAmount.toLocaleString()}원`,
      ];
      svg
        .append('g')
        .attr('transform', `translate(${width + 20}, ${height - 280})`)
        .selectAll('text')
        .data(statsText)
        .enter()
        .append('text')
        .attr('y', (d, i) => i * 15)
        .style('font-size', '11px')
        .style('fill', '#666')
        .text((d) => d);
    }

    // =================================================================
    // [공통 UI 요소] - 모든 뷰에서 동일하게 표시
    // =================================================================

    svg
      .append('text')
      .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('거래 날짜');
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#666')
      .text('거래 금액 (만원)');

    const legend = svg.append('g').attr('transform', `translate(${width + 20}, 20)`);
    const legendData = [
      { key: 'WITHDRAWAL', label: '출금', color: color('WITHDRAWAL') },
      { key: 'PAYMENT', label: '결제', color: color('PAYMENT') },
    ];
    legend
      .selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)
      .each(function (d) {
        const g = d3.select(this);
        g.append('line')
          .attr('x1', 0)
          .attr('x2', 20)
          .attr('y1', 0)
          .attr('y2', 0)
          .attr('stroke', d.color as string)
          .attr('stroke-width', 3);
        g.append('text').attr('x', 25).attr('y', 0).attr('dy', '0.35em').style('font-size', '12px').text(d.label);
      });

    const latestDate = d3.max(filteredData, (d) => d.occurred_at);
    const earliestDate = d3.min(filteredData, (d) => d.occurred_at);
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top + 15)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text(
        `${periodLabels[selectedPeriod]} 거래 내역 (${d3.timeFormat('%y.%m.%d')(earliestDate as Date)} ~ ${d3.timeFormat('%y.%m.%d')(latestDate as Date)})`,
      );

    setIsUpdating(false);
  }, [filteredData, selectedPeriod]);

  return (
    <div className="transaction-chart-container">
      <div className="chart-controls" style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="period-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          조회 기간:
        </label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as TimePeriod)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="1month">최근 1개월</option>
          <option value="3months">최근 3개월</option>
          <option value="6months">최근 6개월</option>
        </select>
        {isUpdating && <span style={{ marginLeft: '10px', color: '#666', fontSize: '12px' }}>차트 업데이트 중...</span>}
      </div>
      <div id="transaction-chart-dataviz" style={{ position: 'relative' }} />
    </div>
  );
}
