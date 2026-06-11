import { Box, Flex } from "@internal/design-system/primitives";
import { Surface, Text } from "@internal/design-system/components";
import * as style from "./TransactionChart.css";

const skeletonBarHeights = [
  { key: "bar-a", height: "36%" },
  { key: "bar-b", height: "58%" },
  { key: "bar-c", height: "44%" },
  { key: "bar-d", height: "72%" },
  { key: "bar-e", height: "63%" },
  { key: "bar-f", height: "86%" },
  { key: "bar-g", height: "68%" },
  { key: "bar-h", height: "52%" },
] as const;

export function TransactionChartSkeleton({
  mode = "loading",
}: {
  mode?: "loading" | "refreshing";
}) {
  const isRefreshing = mode === "refreshing";

  return (
    <Flex
      as="section"
      aria-label={isRefreshing ? "거래 차트 업데이트 중" : "거래 차트 로딩 중"}
      aria-busy="true"
      direction="column"
      className={style.statePanel}
    >
      {isRefreshing ? (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className={style.skeletonStatusRow}
        >
          <Box className={style.skeletonStatusBadge}>업데이트 중</Box>
          <Text
            as="p"
            variant="description"
            className={style.skeletonStatusDescription}
          >
            선택한 계좌의 최신 거래내역을 다시 불러오고 있습니다.
          </Text>
        </Flex>
      ) : null}
      <Surface
        tone="subtle"
        elevation="none"
        padding={0}
        className={style.stateSummaryPanel}
      >
        <Flex direction="column" gap={3}>
          <Flex gap={2} className={style.skeletonRow}>
            <Box className={style.skeletonToggle} />
            <Box className={style.skeletonToggle} />
            <Box className={style.skeletonToggle} />
          </Flex>
          <Box className={style.skeletonLabel} />
          <Box className={style.skeletonAmount} />
          <Box className={style.skeletonTrend} />
          <Flex gap={2} className={style.skeletonRow}>
            <Box className={style.skeletonPeriod} />
            <Box className={style.skeletonPeriod} />
            <Box className={style.skeletonPeriod} />
          </Flex>
        </Flex>
      </Surface>

      <Surface
        tone="subtle"
        elevation="raised"
        padding={0}
        className={style.skeletonChartSurface}
      >
        {skeletonBarHeights.map(({ key, height }) => (
          <Box
            key={key}
            className={style.skeletonChartBar}
            style={{ height }}
          />
        ))}
      </Surface>
    </Flex>
  );
}
