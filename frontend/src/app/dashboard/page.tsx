import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { TransactionProvider } from "@/components/TransactionChart/TransactionProvider";
import { accountKeys } from "@/entities/accounts/accounts.query";
import { transactionKeys } from "@/entities/transactions/transaction.query";
import { getQueryClient } from "@/lib/query-client";
import { getAccountsData } from "./ui/Dashboard/utils/getAccountsData";
import { getPinAvailable } from "./ui/Dashboard/utils/getPinAvailable";
import { getTransactions } from "./ui/Dashboard/utils/getTransactions";
import { DashboardPage } from "./ui/DashboardPage";
import { MainTitle } from "./ui/MainTitle";

export default async function Dashboard() {
  const [isPinAvailable, accounts] = await Promise.all([
    getPinAvailable(),
    getAccountsData(),
  ]);

  if (!isPinAvailable) {
    redirect("/register-pin");
  }

  const queryClient = getQueryClient();
  queryClient.setQueryData(accountKeys.all(), accounts);

  const defaultAccount = accounts[0];

  if (defaultAccount) {
    await queryClient.prefetchQuery({
      queryKey: transactionKeys.byAccount(defaultAccount.account_number),
      queryFn: () => getTransactions(defaultAccount.account_number),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionProvider>
        <MainTitle />
        <DashboardPage />
      </TransactionProvider>
    </HydrationBoundary>
  );
}
