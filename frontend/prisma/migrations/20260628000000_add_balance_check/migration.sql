ALTER TABLE "accounts" ADD CONSTRAINT "balance_not_negative" CHECK (balance >= 0);
