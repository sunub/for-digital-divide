import { Flex } from "@/shared/ui/Flex";
import * as style from "./TransactionLengend.css";

export function TransactionLegend() {
  return (
    <div className={style.legendContainer}>
      <Flex alignItems="center" gap={1}>
        <div className={style.balanceIndicator} />
        <span className={style.balanceLabel}>잔액</span>
      </Flex>
      <Flex alignItems="center" gap={1}>
        <div className={style.incomeIndicator} />
        <span className={style.incomeLabel}>수입</span>
      </Flex>
      <Flex alignItems="center" gap={1}>
        <div className={style.expenseIndicator} />
        <span className={style.expenseLabel}>지출</span>
      </Flex>
    </div>
  );
}
