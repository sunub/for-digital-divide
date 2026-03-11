import { useEffect, useRef } from "react";
import { useInteractionStore } from "../store/InteractionStore";
import { TransactionChartController } from "../TransactionChartController";
import type { ChartViewMode, DailyData } from "../types";
import { chartMetrics } from "../utils/transactionChartMetrics";

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
  const lastHoverSampleAtRef = useRef(0);

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
    const initStart =
      typeof performance === "undefined" ? Date.now() : performance.now();
    controllerRef.current.resize(width, height);
    const initDuration =
      (typeof performance === "undefined" ? Date.now() : performance.now()) -
      initStart;
    chartMetrics.record(
      "chartResize",
      {
        reason: "init",
        width,
        height,
        dataLength: data.length,
        viewMode,
      },
      initDuration,
    );

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || !controllerRef.current) return;
      const { width, height } = entries[0].contentRect;
      requestAnimationFrame(() => {
        if (!controllerRef.current) return;
        const start =
          typeof performance === "undefined" ? Date.now() : performance.now();
        controllerRef.current?.resize(width, height);
        const end =
          typeof performance === "undefined" ? Date.now() : performance.now();
        chartMetrics.record(
          "chartResize",
          {
            reason: "observer",
            width,
            height,
            dataLength: data.length,
            viewMode,
          },
          end - start,
        );

        chartMetrics.collectMemorySnapshot("chartResize");
      });
    });

    chartMetrics.collectMemorySnapshot("chartMount");
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [data.length, viewMode]);

  useEffect(() => {
    if (controllerRef.current) {
      const start =
        typeof performance === "undefined" ? Date.now() : performance.now();
      controllerRef.current.update(data, { viewMode });
      const end =
        typeof performance === "undefined" ? Date.now() : performance.now();

      chartMetrics.record(
        "chartUpdate",
        {
          viewMode,
          dataLength: data.length,
          containerSize: (() => {
            const container = containerRef.current;
            if (!container) return null;
            const rect = container.getBoundingClientRect();
            return `${Math.round(rect.width)}x${Math.round(rect.height)}`;
          })(),
        },
        end - start,
      );
      chartMetrics.collectMemorySnapshot("chartUpdate");
    }
  }, [data, viewMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!controllerRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const start =
      typeof performance === "undefined" ? Date.now() : performance.now();

    const result = controllerRef.current.getInteractionData(mouseX);
    const elapsed =
      (typeof performance === "undefined" ? Date.now() : performance.now()) -
      start;

    if (result) {
      setHoverData(result.data);
      setHoverPos({ x: result.x, y: result.y });
    }

    const now =
      typeof performance === "undefined" ? Date.now() : performance.now();
    if (now - lastHoverSampleAtRef.current > 16) {
      lastHoverSampleAtRef.current = now;
      chartMetrics.record(
        "interaction",
        {
          dataLength: data.length,
          x: Math.round(mouseX),
          hasResult: Boolean(result),
          viewMode,
        },
        elapsed,
      );
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
