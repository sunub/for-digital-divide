import { useEffect, useRef } from "react";

type ChartMetricKind =
  | "processData"
  | "chartUpdate"
  | "chartResize"
  | "interaction"
  | "render"
  | "memory";

type MetricPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

type MetricRecord = {
  id: number;
  kind: ChartMetricKind;
  ts: number;
  durationMs?: number;
  payload: MetricPayload;
};

type MetricAggregate = {
  count: number;
  totalDurationMs: number;
  minDurationMs: number;
  maxDurationMs: number;
  lastDurationMs: number;
};

type RenderCountMap = Map<string, number>;

type RawMemoryStat = {
  ts: number;
  usedJSHeapSize: number | null;
  totalJSHeapSize: number | null;
  jsHeapSizeLimit: number | null;
};

const MAX_EVENTS = 8000;
const MAX_MEMORY_EVENTS = 240;

const isBrowser = typeof window !== "undefined";

function now(): number {
  return isBrowser && typeof performance !== "undefined"
    ? performance.now()
    : Date.now();
}

class TransactionChartMetricCollector {
  private enabled = isBrowser && process.env.NODE_ENV !== "production";
  private events: MetricRecord[] = [];
  private aggregates = new Map<ChartMetricKind, MetricAggregate>();
  private renderCounts: RenderCountMap = new Map();
  private eventId = 0;
  private memorySnapshots: RawMemoryStat[] = [];

  private addToEvents(record: MetricRecord) {
    if (!this.enabled) {
      return;
    }

    this.events.push(record);
    if (this.events.length > MAX_EVENTS) {
      this.events.shift();
    }

    if (typeof record.durationMs === "number") {
      const prev = this.aggregates.get(record.kind);
      if (!prev) {
        this.aggregates.set(record.kind, {
          count: 1,
          totalDurationMs: record.durationMs,
          minDurationMs: record.durationMs,
          maxDurationMs: record.durationMs,
          lastDurationMs: record.durationMs,
        });
        return;
      }

      prev.count += 1;
      prev.totalDurationMs += record.durationMs;
      prev.minDurationMs = Math.min(prev.minDurationMs, record.durationMs);
      prev.maxDurationMs = Math.max(prev.maxDurationMs, record.durationMs);
      prev.lastDurationMs = record.durationMs;
    }
  }

  public record(
    kind: ChartMetricKind,
    payload: MetricPayload,
    durationMs?: number,
  ) {
    if (!this.enabled) {
      return;
    }

    this.addToEvents({
      id: this.eventId++,
      kind,
      ts: Date.now(),
      durationMs,
      payload,
    });
  }

  public measureSync<T>(
    kind: ChartMetricKind,
    payload: MetricPayload,
    fn: () => T,
  ): T {
    if (!this.enabled) {
      return fn();
    }

    const start = now();
    const result = fn();
    const durationMs = now() - start;
    this.record(kind, payload, durationMs);
    return result;
  }

  public trackRender(componentName: string, payload: MetricPayload = {}) {
    if (!this.enabled) {
      return;
    }

    const prev = this.renderCounts.get(componentName) ?? 0;
    const next = prev + 1;
    this.renderCounts.set(componentName, next);

    this.record("render", {
      ...payload,
      component: componentName,
      renderCount: next,
    });
  }

  public collectMemorySnapshot(context: string) {
    if (
      !this.enabled ||
      !isBrowser ||
      !performance ||
      !("memory" in performance)
    ) {
      return;
    }

    const memory = (
      performance as Performance & {
        memory?: {
          usedJSHeapSize?: number;
          totalJSHeapSize?: number;
          jsHeapSizeLimit?: number;
        };
      }
    ).memory;

    if (!memory) {
      return;
    }

    const stat: RawMemoryStat = {
      ts: now(),
      usedJSHeapSize: memory.usedJSHeapSize ?? null,
      totalJSHeapSize: memory.totalJSHeapSize ?? null,
      jsHeapSizeLimit: memory.jsHeapSizeLimit ?? null,
    };

    this.memorySnapshots.push(stat);
    if (this.memorySnapshots.length > MAX_MEMORY_EVENTS) {
      this.memorySnapshots.shift();
    }

    this.record("memory", {
      context,
      usedJSHeapSize: stat.usedJSHeapSize,
      totalJSHeapSize: stat.totalJSHeapSize,
      jsHeapSizeLimit: stat.jsHeapSizeLimit,
    });
  }

  public getSummary() {
    const summary: Record<
      string,
      Omit<MetricAggregate, "totalDurationMs"> & { avgDurationMs: number }
    > = {};

    this.aggregates.forEach((value, key) => {
      summary[key] = {
        count: value.count,
        minDurationMs: value.minDurationMs,
        maxDurationMs: value.maxDurationMs,
        lastDurationMs: value.lastDurationMs,
        avgDurationMs: value.totalDurationMs / Math.max(value.count, 1),
      };
    });

    const lastMemory = this.memorySnapshots.at(-1) ?? null;

    return {
      enabled: this.enabled,
      eventCount: this.events.length,
      uniqueRenders: Array.from(this.renderCounts.entries()).map(
        ([name, count]) => ({
          component: name,
          renderCount: count,
        }),
      ),
      summary,
      latestMemory: lastMemory,
      memorySamples: this.memorySnapshots,
      events: this.enabled ? this.events.slice(-300) : [],
    };
  }

  public getRaw() {
    return {
      events: [...this.events],
    };
  }

  public reset() {
    if (!this.enabled) {
      return;
    }

    this.events = [];
    this.aggregates.clear();
    this.renderCounts.clear();
    this.memorySnapshots = [];
  }
}

export const chartMetrics = new TransactionChartMetricCollector();

export function useRenderCounter(
  componentName: string,
  payload: MetricPayload = {},
) {
  const renderIdRef = useRef(0);
  const currentRenderId = renderIdRef.current + 1;

  renderIdRef.current = currentRenderId;

  useEffect(() => {
    chartMetrics.trackRender(componentName, {
      ...payload,
      renderId: currentRenderId,
    });
  }, [componentName, currentRenderId, payload]);

  return renderIdRef.current;
}

if (isBrowser) {
  (
    window as { __TC_CHART_METRICS__?: Record<string, unknown> }
  ).__TC_CHART_METRICS__ = {
    record: (
      kind: ChartMetricKind,
      payload: MetricPayload,
      durationMs?: number,
    ) => chartMetrics.record(kind, payload, durationMs),
    summary: () => chartMetrics.getSummary(),
    raw: () => chartMetrics.getRaw(),
    reset: () => chartMetrics.reset(),
    measureSync: <T>(
      kind: ChartMetricKind,
      payload: MetricPayload,
      fn: () => T,
    ) => chartMetrics.measureSync(kind, payload, fn),
    collectMemory: (context: string) =>
      chartMetrics.collectMemorySnapshot(context),
  };
}
