"use client";

import { TransactionChart } from "@/components/TransactionChart/TransactionChart";
import * as chartStyle from "@/components/TransactionChart/TransactionChart.css";
import { TransactionChartErrorState } from "@/components/TransactionChart/TransactionChartErrorState";
import { TransactionChartSkeleton } from "@/components/TransactionChart/TransactionChartSkeleton";
import { useTransactions } from "@/entities/transactions/useTransactions";
import type { AccountData } from "../../utils/getAccountsData";

type Account = AccountData[number];

export function TransactionHistory({ account }: { account: Account }) {
  const transactionQuery = useTransactions(account.account_number);
  const hasResolvedData = transactionQuery.data !== undefined;

  if (transactionQuery.isPending && !hasResolvedData) {
    return <TransactionChartSkeleton />;
  }

  if (transactionQuery.isFetching && transactionQuery.isPlaceholderData) {
    return <TransactionChartSkeleton mode="refreshing" />;
  }

  if (transactionQuery.error && !hasResolvedData) {
    return (
      <TransactionChartErrorState onRetry={() => transactionQuery.refetch()} />
    );
  }

  return (
    <div className={chartStyle.statusContainer}>
      {transactionQuery.error ? (
        <div className={chartStyle.statusErrorBadge}>
          최신 거래내역 반영에 실패했습니다.
        </div>
      ) : null}
      <TransactionChart
        transactionData={transactionQuery.data || []}
        currentBalance={Number(account.balance)}
      />
    </div>
  );
}
