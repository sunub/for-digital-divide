import * as d3 from 'd3';

type Data = {
  account_number: number;
  transaction_id: number;
  amount: number;
  transaction_type: 'DEPOSIT' | 'WITHDRAWAL' | 'PAYMENT';
  occurred_at: string | Date;
  counterparty_account_number?: number | undefined;
  description?: string | undefined;
};

export function drawingTooltipOnGraph(data: Data, event: MouseEvent): void {
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

  const typeLabel =
    data.transaction_type === 'DEPOSIT' ? '입금' : data.transaction_type === 'WITHDRAWAL' ? '출금' : '결제';

  tooltip
    .html(
      `<b>날짜:</b> ${d3.timeFormat('%Y년 %m월 %d일')(data.occurred_at as Date)}<br><b>시간:</b> ${d3.timeFormat(
        '%H시 %M분',
      )(
        data.occurred_at as Date,
      )}<br><b>금액:</b> ${data.amount.toLocaleString()}원<br><b>유형:</b> ${typeLabel}<br><b>내용:</b> ${
        data.description || 'N/A'
      }`,
    )
    .style('left', `${event.pageX + 15}px`)
    .style('top', `${event.pageY - 15}px`);
}
