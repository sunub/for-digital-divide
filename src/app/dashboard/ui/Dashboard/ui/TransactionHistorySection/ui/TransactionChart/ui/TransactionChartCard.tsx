'use client';

import * as d3 from 'd3';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Spacer from '@/constants/Spacer';
import { motion } from 'motion/react';

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

interface CardLayoutProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  isChartVisible: boolean;
}

function CardLayout({ children, isChartVisible, ...props }: CardLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const smallCard = el.querySelector<HTMLDivElement>('.small-card');
    if (!smallCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      smallCard.style.setProperty('--mx', `${x}px`);
      smallCard.style.setProperty('--my', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <CardLayoutRootContainer $isChartVisible={isChartVisible} {...props} ref={containerRef}>
      {children}
    </CardLayoutRootContainer>
  );
}

export const HoveringTextField = memo(({ isHovering }: { isHovering: boolean }) => {
  return <HoveringText $isHovering={isHovering}>{''}</HoveringText>;
});

export function Card({ children, ...props }: CardLayoutProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <CardLayout {...props}>
      <CardContentContainer onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <CardContent>{children}</CardContent>
      </CardContentContainer>
      <SmallCard className="small-card" />
      <HoveringTextField isHovering={isHover} />
    </CardLayout>
  );
}

export function TransactionChartCard({ children }: { children: React.ReactNode }) {
  const [isChartVisible, setIsChartVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const lastScrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isChartVisible && chartRef.current) {
      const width = 200;
      const height = 80;
      const margin = { top: 10, right: 0, bottom: 0, left: 0 };
      const chartHeight = height - margin.top;
      const padding = 10;

      const svgRoot = d3.select(chartRef.current);
      svgRoot.selectAll('*').remove();

      const svg = svgRoot
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(TITLE_SVG_DATA, (d) => d.index) as [number, number])
        .range([padding, width - padding]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(TITLE_SVG_DATA, (d) => d.value) as number])
        .range([chartHeight, 0]);

      svg
        .append('path')
        .datum(TITLE_SVG_DATA)
        .attr('fill', 'none')
        .attr('stroke', 'color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)')
        .attr('stroke-width', 2)
        .attr(
          'd',
          d3
            .line<{ index: number; value: number }>()
            .x((d) => xScale(d.index))
            .y((d) => yScale(d.value)),
        );

      svg
        .append('g')
        .selectAll('dot')
        .data(TITLE_SVG_DATA)
        .join('circle')
        .attr('cx', (d) => xScale(d.index))
        .attr('cy', (d) => yScale(d.value))
        .attr('r', 3)
        .attr('fill', 'white')
        .attr('stroke', 'color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)')
        .attr('stroke-width', 1.75);
    }

    if (isChartVisible && lastScrollIndicatorRef.current) {
      const lastScrollIndicator = lastScrollIndicatorRef.current;
      lastScrollIndicator.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isChartVisible]);

  return (
    <>
      <Spacer axis="vertical" size={16} />
      <Card
        isChartVisible={isChartVisible}
        onClick={() => setIsChartVisible(true)}
        layout
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {isChartVisible ? (
          <>
            {children}
            <div id="chart-last-scroll-indicator" ref={lastScrollIndicatorRef} />
          </>
        ) : (
          <>
            <Graph ref={chartRef} />
            <h2>내 자산 흐름을 한눈에 확인해 보세요!</h2>
          </>
        )}
      </Card>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardLayoutRootContainer = styled(motion.div)<{ $isChartVisible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 100cqw;
  user-select: none;
  cursor: ${({ $isChartVisible }) => ($isChartVisible ? 'default' : 'pointer')};
`;

const CardContentContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: calc(100cqw - 1.15rem);
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  z-index: 2;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  padding: 2px;
  background: rgba(255, 255, 255, 0.15);
  transition:
    box-shadow 300ms ease,
    transform 100ms ease;

  &:hover {
    box-shadow: var(--long-shadow);
    outline: 4px solid color-mix(in oklch, oklch(63.93% 0.206 288.34) 15%, transparent);
  }

  @media screen and (max-width: 320px) {
    width: 120px;
  }
`;

const CardContent = styled.div`
  pointer-events: auto;
  display: grid;
  align-items: center;
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%);
  width: 100%;
  height: 100%;
  padding: 1rem;
  transition: background 350ms ease;
  touch-action: manipulation;
  animation: ${fadeIn} 500ms ease-in-out;
`;

const SmallCard = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(100cqw - 1.15rem);
  height: 100%;
  border-radius: 1rem;
  z-index: 1;

  background-image: radial-gradient(
    300px circle at var(--mx, 0px) var(--my, 0px),
    var(--color-background),
    color-mix(in oklch, oklch(63.93% 0.206 288.34) 28%, transparent 30%)
  );

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const HoveringText = styled.p<{ $isHovering: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
  transition: opacity 300ms ease;

  background: linear-gradient(to bottom, color-mix(in oklch, oklch(63.93% 0.206 288.34), transparent 15%), transparent);

  color: #333;
  text-shadow: 0 0 5px white;

  padding: 0.25rem 1rem;
  margin-top: 0.35rem;
  border-radius: 1rem;
  width: max-content;
  font-size: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
`;

const Graph = styled(FlexCenterDiv)``;
