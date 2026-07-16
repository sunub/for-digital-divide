import { Tooltip } from "@internal/design-system/components";
import { Grid } from "@internal/design-system/primitives";
import { gridLayout } from "@internal/design-system/style";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TransactionProvider } from "@/components/TransactionChart/TransactionProvider";
import { accountKeys } from "@/entities/accounts/accounts.query";
import { transactionKeys } from "@/entities/transactions/transaction.query";
import { getQueryClient } from "@/lib/query-client";
import { Device } from "@/shared/layout";
import { DashboardGuide } from "./DashboardGuide";
import * as style from "./layout.css";
import { TransitionLayout } from "./TransitionLayout";
import { DashboardHeader } from "./ui/Dashboard/ui/DashboardHeader/DashboardHeader";
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
    <Grid className={gridLayout}>
      <DashboardGuide />

      <Tooltip.Provider>
        <Device.Frame>
          <Device.Content>
            <Grid
              width={"full"}
              height={"full"}
              className={style.dashboardRootContainer}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardHeader />
              </Suspense>

              <TransitionLayout className={style.dashboardContentContainer}>
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <TransactionProvider>
                    <MainTitle />
                    <DashboardPage />
                  </TransactionProvider>
                </HydrationBoundary>
              </TransitionLayout>
            </Grid>
          </Device.Content>
        </Device.Frame>
        <div id="tooltip-root" />
      </Tooltip.Provider>
    </Grid>
  );
}
