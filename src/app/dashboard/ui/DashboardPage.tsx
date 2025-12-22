"use client";

import { useState } from "react";
import { AccountSection } from "./Dashboard/ui/AccountSection";
import { DashboardContent } from "./Dashboard/ui/DashBoardContent";
import { DashboardSeperator } from "./Dashboard/ui/DashboardSeperator";
import { TransactionHistory } from "./Dashboard/ui/TransactionChart/TransactionHistory";
import { TransactionChartTitle } from "./Dashboard/ui/TransactionChart/ui/TransactionChartTitle";
import type { AccountData } from "./Dashboard/utils/getAccountsData";

export function DashboardPage({ accounts }: { accounts: AccountData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const _selectedAccount = accounts[selectedIndex];

  return (
    <DashboardContent>
      <AccountSection accounts={accounts} onSlideChange={setSelectedIndex} />
      <DashboardSeperator />
      <TransactionChartTitle />
      {_selectedAccount && <TransactionHistory account={_selectedAccount} />}
    </DashboardContent>
  );
}
