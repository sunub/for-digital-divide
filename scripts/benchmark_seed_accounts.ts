import chalk from "chalk";
import { AccountsSchema } from "../src/entities/accounts/accounts.model";
import { generateAccounts } from "./generateAccounts";

async function benchmark() {
  const userId = 1;
  const accounts = generateAccounts(userId, 100);

  console.log(chalk.blue(`Benchmarking with ${accounts.length} accounts...`));

  // --- Baseline (Old Logic) ---
  console.log(chalk.yellow("\nRunning Baseline (N+1 approach)..."));
  const baselineStart = performance.now();
  const _baselineCreated = [];

  // Note: This is a simulation since we can't actually run it without a DB
  // In a real run, this would loop and await
  for (const account of accounts) {
    const parsedAccount = AccountsSchema.safeParse({
      account_number: Number(account.account_number),
      user_id: Number(account.user_id),
      account_type: account.account_type,
      balance: Number(account.balance),
      created_at: new Date(account.created_at),
    });
    if (parsedAccount.success) {
      // simulate await accountsService.findByAccountNumber(...)
      // simulate await accountsService.create(...)
    }
  }
  const baselineEnd = performance.now();
  console.log(
    chalk.green(
      `Baseline simulated time: ${(baselineEnd - baselineStart).toFixed(2)}ms`,
    ),
  );

  // --- Optimized Logic ---
  console.log(chalk.yellow("\nRunning Optimized (Bulk approach)..."));
  const optStart = performance.now();

  const parsedAccounts = accounts
    .map((account) =>
      AccountsSchema.safeParse({
        account_number: Number(account.account_number),
        user_id: Number(account.user_id),
        account_type: account.account_type,
        balance: Number(account.balance),
        created_at: new Date(account.created_at),
      }),
    )
    .filter((parsed) => parsed.success)
    .map((parsed) => parsed.data);

  const _accountNumbers = parsedAccounts.map((a) => a.account_number);
  // simulate await accountsService.findManyByAccountNumbers(accountNumbers);
  // simulate await accountsService.createManyAndReturn(accountsToCreate);

  const optEnd = performance.now();
  console.log(
    chalk.green(
      `Optimized simulated time: ${(optEnd - optStart).toFixed(2)}ms`,
    ),
  );

  console.log(
    chalk.cyan(
      `\nTheoretical improvement: Reduced database round trips from ${accounts.length * 2} to 2.`,
    ),
  );
}

benchmark().catch(console.error);
