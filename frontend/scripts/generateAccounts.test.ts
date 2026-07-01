import { describe, expect, it } from "vitest";
import { generateAccounts } from "./generateAccounts";
import { generateTransactions } from "./generateTransactions";

describe("demo account generators", () => {
  it("never creates accounts with negative balances", () => {
    const accounts = generateAccounts(1, 200);

    for (const account of accounts) {
      expect(account.balance).toBeGreaterThanOrEqual(0);
    }
  });

  it("never drives account balances negative while generating transactions", async () => {
    const accounts = generateAccounts(1, 50);

    const { updatedAccounts } = await generateTransactions(accounts);

    for (const account of updatedAccounts) {
      expect(account.balance).toBeGreaterThanOrEqual(0);
    }
  });
});
