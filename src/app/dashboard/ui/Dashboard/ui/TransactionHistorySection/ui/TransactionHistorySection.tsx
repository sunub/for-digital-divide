import type { TransactionList } from "@dashboard/ui/Dashboard/types";
import type { AccountType } from "@/entities/accounts/accounts.model";
import { getTransactions } from "../../../utils/getTransactions";
import { TransactionChart } from "./TransactionChart";
import { TransactionChartCard } from "./TransactionChart/ui/TransactionChartCard";

export async function TransactionHistorySection({
  account,
}: {
  account: AccountType;
}) {
  const transactionGen = await getTransactions(account.account_number);
  const allTransactions: TransactionList = [];
  while (true) {
    const { done, value } = await transactionGen.next();
    if (done) break;
    allTransactions.push(...(value as TransactionList));
  }

  const mappedTransactions = allTransactions.map((tx) => ({
    ...tx,
    transaction_type: tx.transaction_type as
      | "DEPOSIT"
      | "WITHDRAWAL"
      | "PAYMENT",
    occurred_at: tx.occurred_at,
    counterparty_account_number: tx.counterparty_account_number ?? undefined,
    description: tx.description ?? undefined,
  }));

  return (
    <TransactionChartCard>
      <TransactionChart transactionData={mappedTransactions} />
    </TransactionChartCard>
  );
}
