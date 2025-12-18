"use client";

import { useEffect, useState, useTransition } from "react";
import { getTransactionsAction } from "../../../../../actions/getTransactionsAction";
import type { TransactionList } from "../../../types";
import type { AccountData } from "../../../utils/getAccountsData";
import { TransactionChart } from "./TransactionChart";
import { TransactionChartCard } from "./TransactionChart/ui/TransactionChartCard";

type Account = AccountData[number];

export function ClientTransactionHistory({ account }: { account: Account }) {
  const [transactions, setTransactions] = useState<TransactionList>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getTransactionsAction(account.account_number);

      const mapped = data.map((tx) => ({
        ...tx,
        transaction_type: tx.transaction_type,
        occurred_at: new Date(tx.occurred_at),
        counterparty_account_number:
          tx.counterparty_account_number ?? undefined,
        description: tx.description ?? undefined,
      }));
      setTransactions(mapped);
    });
  }, [account.account_number]);

  return (
    <TransactionChartCard>
      <div style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.2s" }}>
        <TransactionChart transactionData={transactions} />
      </div>
    </TransactionChartCard>
  );
}
