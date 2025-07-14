import { Carousel } from '@/components/Carousel';
import AccountCard from '../../Account';
import { AccountData } from '../utils/getAccountsData';

export async function AccountSection({ accounts }: { accounts: AccountData }) {
  return (
    <Carousel
      options={{
        loop: true,
      }}
    >
      {accounts.map((account) => (
        <AccountCard
          key={account.account_number}
          accountNumber={account.account_number}
          accountType={account.account_type}
          balance={account.balance}
        />
      ))}
    </Carousel>
  );
}
