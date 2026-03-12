import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { TransactionProvider } from "@/components/TransactionChart/TransactionProvider";
import { transactionKeys } from "@/entities/transactions/transaction.query";
import { AlertMessage } from "./ui/Dashboard/ui/AlertMessage";
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
  const queryClient = new QueryClient();
  const defaultAccount = accounts[0];

  if (defaultAccount) {
    const defaultTransactions = await getTransactions(
      defaultAccount.account_number,
    );
    queryClient.setQueryData(
      transactionKeys.byAccount(defaultAccount.account_number),
      defaultTransactions,
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionProvider>
        <AlertMessage defaultOpen={!isPinAvailable} />
        <MainTitle />
        <DashboardPage accounts={accounts} />
      </TransactionProvider>
    </HydrationBoundary>
  );
}
