import { TransactionProvider } from "@/components/TransactionChart/TransactionProvider";
import { AlertMessage } from "./ui/Dashboard/ui/AlertMessage";
import { getAccountsData } from "./ui/Dashboard/utils/getAccountsData";
import { getPinAvailable } from "./ui/Dashboard/utils/getPinAvailable";
import { DashboardPage } from "./ui/DashboardPage";
import { MainTitle } from "./ui/MainTitle";

export default async function Dashboard() {
  const [isPinAvailable, accounts] = await Promise.all([
    getPinAvailable(),
    getAccountsData(),
  ]);

  return (
    <TransactionProvider>
      <AlertMessage defaultOpen={!isPinAvailable} />
      <MainTitle />
      <DashboardPage accounts={accounts} />
    </TransactionProvider>
  );
}
