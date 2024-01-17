import React from "react";
import { Account, getBankAccount } from "@/utils/account";
import AccountCard from "@/components/AccountCard";
import Device from "@/components/Device";

export const dynamic = "force-dynamic";

interface AccountData {
  userId: string;
  accountNumber: string;
  createDate: Date;
}

async function DashBoardPage() {
  const account: Account = await getBankAccount();
  console.log(account);
  return (
    <div>
      <h1>Banking Page</h1>
    </div>
  );
}

export default DashBoardPage;
