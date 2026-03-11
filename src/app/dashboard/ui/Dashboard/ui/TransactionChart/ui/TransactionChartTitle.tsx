"use client";

import { useRef } from "react";
import { Button, Flex, Text } from "@for-digital-divide/design-system";
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
    <Button
      type="button"
      aria-label="Scroll to transaction chart main bottom"
      variant="transparent"
      className={style.cardLayoutRootContainer}
      onClick={handleScroll}
    >
      <Flex alignItems="center" justifyContent="center" gap={4} width="full">
        <div className={style.graph} ref={chartRef} />
        <Text as="span" variant="bodyStrong" className={style.chartTitle}>
          내 자산 흐름을 한눈에 확인해 보세요!
        </Text>
      </Flex>
    </Button>
  );
}
