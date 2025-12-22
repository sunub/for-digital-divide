"use client";

import { useEffect, useState, useTransition } from "react";
import { TransactionChart } from "@/components/TransactionChart/TransactionChart";
import { getTransactionsAction } from "../../../../actions/getTransactionsAction";
import type { TransactionList } from "../../types";
import type { AccountData } from "../../utils/getAccountsData";

type Account = AccountData[number];

export function TransactionHistory({ account }: { account: Account }) {
  const [transactions, setTransactions] = useState<TransactionList>([]);
  const [_, startTransition] = useTransition();

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

  return <TransactionChart transactionData={transactions} />;
}
