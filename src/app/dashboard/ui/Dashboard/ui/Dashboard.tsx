import { MainTitle } from "../../MainTitle";
import { getAccountsData } from "../utils/getAccountsData";
import { getPinAvailable } from "../utils/getPinAvailable";
import { AlertMessage } from "./AlertMessage";

export default async function Dashboard({
  accountIndex,
}: {
  accountIndex: string | undefined;
}) {
  const currentIndex = accountIndex || "0";
  const isPinAvailable = await getPinAvailable();
  const accounts = await getAccountsData();
  const _primaryAccount = accounts[Number(currentIndex)];

  return (
    <>
      <AlertMessage defaultOpen={!isPinAvailable} />
      <MainTitle />
      {/* <DashboardContent>
        <AccountSection accounts={accounts} />
        <TransactionHistorySection
          key={primaryAccount.account_number}
          account={primaryAccount}
        />
      </DashboardContent> */}
    </>
  );
}
