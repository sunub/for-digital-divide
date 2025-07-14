'use client';

import { useState } from 'react';

import type { TransactionList } from '../../../types';
import type { TransactionGen } from '../../../utils/getTransactions';

export function HistoryItem({
  initialTransaction,
  transactionGen,
}: {
  initialTransaction: TransactionList;
  transactionGen: TransactionGen;
}) {
  const [transaction, setTransaction] = useState<TransactionList>(initialTransaction);

  return (
    <div className="max-w-[100cqw]">
      <div>
        {transaction.map((tx) => (
          <div className="flex gap-2" key={tx.transaction_id}>
            <span>{tx.transaction_id}</span>
            <span>{tx.account_number}</span>
            <span>{tx.transaction_type}</span>
          </div>
        ))}
      </div>
      <button
        onClick={async () => {
          const nextTransaction = await transactionGen.next();
          if (!nextTransaction.done) {
            setTransaction(
              nextTransaction.value.map((tx) => ({
                ...tx,
                counterparty_account_number:
                  tx.counterparty_account_number === undefined ? null : tx.counterparty_account_number,
              })),
            );
          }
        }}
      >
        next
      </button>
    </div>
  );
}
