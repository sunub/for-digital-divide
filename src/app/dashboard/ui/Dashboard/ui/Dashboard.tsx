import { getAccountsData } from '../utils/getAccountsData';
import { getPinAvailable } from '../utils/getPinAvailable';
import { AlertMessage } from './AlertMessage';
import { AccountSection } from './AccountSection';
import { DashboardContent } from './DashBoardContent';
import { TransactionHistorySection } from './TransactionHistorySection/ui/TransactionHistorySection';
import { MainTitle } from '../../MainTitle';

export default async function Dashboard({ accountIndex }: { accountIndex: string | undefined }) {
  const currentIndex = accountIndex || '0';
  const isPinAvailable = await getPinAvailable();
  const isAlertOpen = !isPinAvailable;
  const accounts = await getAccountsData();
  const primaryAccount = accounts[Number(currentIndex)];

  return (
    <>
      <AlertMessage defaultOpen={isAlertOpen} />
      <MainTitle />
      <DashboardContent>
        <AccountSection accounts={accounts} />
        <TransactionHistorySection key={primaryAccount.account_number} account={primaryAccount} />
      </DashboardContent>
    </>
  );
}
