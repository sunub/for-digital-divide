import { AlertMessage } from "./ui/Dashboard/ui/AlertMessage";
import { getAccountsData } from "./ui/Dashboard/utils/getAccountsData";
import { getPinAvailable } from "./ui/Dashboard/utils/getPinAvailable";
import { DashboardClient } from "./ui/DashboardClient";
import { MainTitle } from "./ui/MainTitle";

export default async function Dashboard() {
  const [isPinAvailable, accounts] = await Promise.all([
    getPinAvailable(),
    getAccountsData(),
  ]);

  return (
    <>
      <AlertMessage defaultOpen={!isPinAvailable} />
      <MainTitle />
      <DashboardClient accounts={accounts} />
    </>
  );
}
