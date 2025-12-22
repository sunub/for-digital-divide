import { useEffect, useRef } from "react";
import { useInteractionStore } from "../store/InteractionStore";
import { TransactionChartController } from "../TransactionChartController";
import type { ChartViewMode, DailyData } from "../types";

interface UseTransactionChartProps {
  data: DailyData[];
  viewMode: ChartViewMode;
}

export function useTransactionChart({
  data,
  viewMode,
}: UseTransactionChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<TransactionChartController | null>(null);

  const { setHoverData, setHoverPos } = useInteractionStore((state) => ({
    setHoverData: state.setHoverData,
    setHoverPos: state.setHoverPos,
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    controllerRef.current = new TransactionChartController(
      containerRef.current,
    );

    const { width, height } = containerRef.current.getBoundingClientRect();
    controllerRef.current.resize(width, height);

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || !controllerRef.current) return;
      const { width, height } = entries[0].contentRect;
      requestAnimationFrame(() => {
        controllerRef.current?.resize(width, height);
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.update(data, { viewMode });
    }
  }, [data, viewMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!controllerRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const result = controllerRef.current.getInteractionData(mouseX);
    if (result) {
      setHoverData(result.data);
      setHoverPos({ x: result.x, y: result.y });
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
    setHoverPos(null);
  };

  return {
    containerRef,
    handleMouseMove,
    handleMouseLeave,
  };
}
