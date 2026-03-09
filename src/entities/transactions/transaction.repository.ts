import { prisma } from "@root/prisma/prisma";
import type { Transaction } from "./transaction.model";

export const transactionsRepository = {
  async findById(transaction_id: number) {
    return prisma.transactions.findUnique({
      where: { transaction_id: BigInt(transaction_id) },
    });
  },
  async create(data: Omit<Transaction, "transaction_id">) {
    return prisma.transactions.create({
      data: {
        ...data,
        account_number: BigInt(data.account_number),
        counterparty_account_number: data.counterparty_account_number
          ? BigInt(data.counterparty_account_number)
          : null,
      },
    });
  },
  async createMany(data: Omit<Transaction, "transaction_id">[]) {
    return prisma.transactions.createMany({
      data: data.map((d) => ({
        ...d,
        account_number: BigInt(d.account_number),
        counterparty_account_number: d.counterparty_account_number
          ? BigInt(d.counterparty_account_number)
          : null,
      })),
      skipDuplicates: true,
    });
  },
  async delete(transaction_id: number) {
    return prisma.transactions.delete({
      where: { transaction_id: BigInt(transaction_id) },
    });
  },
  async findAll() {
    return prisma.transactions.findMany();
  },
  async findByAccountNumber(account_number: number) {
    return prisma.transactions.findMany({
      where: { account_number: BigInt(account_number) },
    });
  },
};
