import { Button, Flex, Surface, Text } from "@for-digital-divide/design-system";
import * as style from "./TransactionChart.css";

interface TransactionChartErrorStateProps {
  onRetry: () => void;
}

export function TransactionChartErrorState({
  onRetry,
}: TransactionChartErrorStateProps) {
  return (
    <Flex
      as="section"
      aria-label="거래 차트 오류 상태"
      direction="column"
      className={style.statePanel}
    >
      <Surface tone="subtle" elevation="raised" className={style.errorPanel}>
        <div aria-hidden="true" className={style.errorAccent} />
        <Text as="h3" variant="title" className={style.errorTitle}>
          거래내역을 불러오지 못했습니다.
        </Text>
        <Text as="p" variant="body" className={style.errorDescription}>
          네트워크 상태를 확인한 뒤 다시 시도해주세요.
        </Text>
        <Button variant="destructive" size="lg" onClick={onRetry}>
          다시 시도
        </Button>
      </Surface>
    </Flex>
  );
}
