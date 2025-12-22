"use client";

import { useRef } from "react";
import { useTitleAnimation } from "../hooks/useTitleAnimation";
import * as style from "./TransactionChartTitle.css";

export function TransactionChartTitle() {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const target = document.getElementById("transaction-chart-main-bottom");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useTitleAnimation(chartRef);

  return (
    <button
      type="button"
      tabIndex={0}
      aria-label="Scroll to transaction chart main bottom"
      className={style.cardLayoutRootContainer}
      onClick={handleScroll}
    >
      <div className={style.graph} ref={chartRef} />
      <span className={style.chartTitle}>
        내 자산 흐름을 한눈에 확인해 보세요!
      </span>
    </button>
  );
}
