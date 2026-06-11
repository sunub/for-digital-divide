import { Box, Flex } from "@internal/design-system/primitives";
import { Text } from "@internal/design-system/components";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clsx } from "clsx";
import { useShallow } from "zustand/react/shallow";
import { useInteractionStore } from "../store/InteractionStore";
import type { ChartViewMode } from "../types";
import * as style from "./TransactionChartHoverBox.css";

interface TransactionChartHoverBoxProps {
  viewMode: ChartViewMode;
}

export function TransactionChartHoverBox({
  viewMode,
}: TransactionChartHoverBoxProps) {
  const { hoverData, hoverPos } = useInteractionStore(
    useShallow((state) => ({
      hoverData: state.hoverData,
      hoverPos: state.hoverPos,
    })),
  );

  if (!hoverData || !hoverPos) return null;

  const isRightSide = hoverPos.x > 300;

  const variant =
    viewMode === "ALL"
      ? "balance"
      : viewMode === "INCOME"
        ? "income"
        : viewMode === "EXPENSE"
          ? "expense"
          : "balance";

  return (
    <Box
      className={style.container}
      style={assignInlineVars({
        [style.xVar]: `${hoverPos.x}px`,
        [style.yVar]: `${hoverPos.y}px`,
      })}
    >
      <Box aria-hidden="true" className={style.cursorLine} />

      <Box aria-hidden="true" className={style.point({ variant })} />

      <Box
        className={clsx(
          style.tooltipContainer,
          isRightSide ? style.tooltipRight : style.tooltipLeft,
        )}
      >
        <Text as="p" variant="description" className={style.tooltipDate}>
          {hoverData.date.toLocaleDateString()}
        </Text>

        <Flex justifyContent="space-between" alignItems="center" gap={3}>
          <Text
            as="span"
            variant="body"
            className={style.tooltipLabel}
            color="expense"
          >
            지출
          </Text>
          <Text as="span" variant="bodyStrong" className={style.tooltipValue}>
            {hoverData.expense.toLocaleString()}원
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" gap={3}>
          <Text
            as="span"
            variant="body"
            className={style.tooltipLabel}
            color="income"
          >
            수입
          </Text>
          <Text as="span" variant="bodyStrong" className={style.tooltipValue}>
            {hoverData.income.toLocaleString()}원
          </Text>
        </Flex>
        <Box aria-hidden="true" className={style.separator} />
        <Flex justifyContent="space-between" alignItems="center" gap={3}>
          <Text
            as="span"
            variant="bodyStrong"
            className={style.tooltipLabel}
            color="balance"
          >
            잔액
          </Text>
          <Text as="span" variant="bodyStrong" className={style.tooltipValue}>
            {hoverData.balance.toLocaleString()}원
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
