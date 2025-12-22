import { Carousel } from "@/components/Carousel";
import AccountCard from "../../Account";
import type { AccountData } from "../utils/getAccountsData";

export function AccountSection({
  accounts,
  onSlideChange,
}: {
  accounts: AccountData;
  onSlideChange?: (index: number) => void;
}) {
  return (
    <Carousel
      options={{
        loop: true,
      }}
      onSlideChange={onSlideChange}
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
