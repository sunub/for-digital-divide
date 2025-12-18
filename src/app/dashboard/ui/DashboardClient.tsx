"use client";

import { useState } from "react";
import { AccountSection } from "./Dashboard/ui/AccountSection";
import { DashboardContent } from "./Dashboard/ui/DashBoardContent";
import type { AccountData } from "./Dashboard/utils/getAccountsData";

export function DashboardClient({ accounts }: { accounts: AccountData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const _selectedAccount = accounts[selectedIndex];

  return (
    <DashboardContent>
      <AccountSection accounts={accounts} onSlideChange={setSelectedIndex} />
      {/* {selectedAccount && (
        <ClientTransactionHistory account={selectedAccount} />
      )} */}
    </DashboardContent>
  );
}
