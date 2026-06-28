import { Prisma } from "@prisma/client";
import { prisma } from "@root/prisma/prisma";
import {
  AccountNotFoundException,
  InsufficientFundsException,
} from "@/shared/exceptions/transfer.exception";
import { TRANSACTION_TYPE } from "./transaction.constants";

export const transferService = {
  async executeTransfer(
    fromAccountNumber: bigint,
    toAccountNumber: bigint,
    amount: number,
  ) {
    if (amount <= 0) {
      throw new Error("송금액은 0원보다 커야 합니다.");
    }
    const sortedAccounts = [fromAccountNumber, toAccountNumber].sort((a, b) =>
      a < b ? -1 : 1,
    );

    // START TRANSACTION
    return prisma.$transaction(async (tx) => {
      for (const acc of sortedAccounts) {
        await tx.$queryRaw`SELECT 1 FROM accounts WHERE account_number = ${acc} FOR UPDATE`;
      }

      const sender = await tx.accounts.findUnique({
        where: { account_number: fromAccountNumber },
      });
      const receiver = await tx.accounts.findUnique({
        where: { account_number: toAccountNumber },
      });

      if (!sender || !receiver) {
        throw new AccountNotFoundException();
      }

      if (Number(sender.balance) < amount) {
        throw new InsufficientFundsException();
      }

      await tx.accounts.update({
        where: { account_number: fromAccountNumber },
        data: { balance: { decrement: amount } },
      });
      await tx.accounts.update({
        where: { account_number: toAccountNumber },
        data: { balance: { increment: amount } },
      });

      await tx.transactions.createMany({
        data: [
          {
            account_number: fromAccountNumber,
            amount: new Prisma.Decimal(amount * -1),
            transaction_type: TRANSACTION_TYPE.TRANSFER_OUT,
            counterparty_account_number: toAccountNumber,
            description: "송금 출금",
          },
          {
            account_number: toAccountNumber,
            amount: new Prisma.Decimal(amount),
            transaction_type: TRANSACTION_TYPE.TRANSFER_IN,
            counterparty_account_number: fromAccountNumber,
            description: "송금 입금",
          },
        ],
      });

      return {
        success: true,
        transferredAmount: amount,
        timestamp: new Date(),
      };
    });
  },
};
