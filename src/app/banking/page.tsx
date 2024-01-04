import React from "react";
import { Account, getBankAccount } from "@/utils/account";
import AccountCard from "@/components/AccountCard";

export const dynamic = "force-dynamic";

interface AccountData {
  userId: string;
  accountNumber: string;
  createDate: Date;
}

async function BankingPage() {
  const account: Account = await getBankAccount();
  console.log(account);
  return (
    <div>
      <h1>Banking Page</h1>
      <AccountCard accounts={[account]} />
    </div>
  );
}

export default BankingPage;
