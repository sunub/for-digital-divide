import { prisma } from "@root/prisma/prisma";
import type { Transaction } from "./transaction.model";

export const transactionsRepository = {
  async findById(transaction_id: number) {
    return prisma.transactions.findUnique({
      where: { transaction_id },
    });
  },
  async create(data: Omit<Transaction, "transaction_id">) {
    return prisma.transactions.create({
      data,
    });
  },
  async createMany(data: Omit<Transaction, "transaction_id">[]) {
    return prisma.transactions.createMany({
      data,
      skipDuplicates: true,
    });
  },
  async delete(transaction_id: number) {
    return prisma.transactions.delete({
      where: { transaction_id },
    });
  },
  async findAll() {
    return prisma.transactions.findMany({
      orderBy: { occurred_at: "desc" },
    });
  },
  async findByAccountNumber(account_number: number) {
    return prisma.transactions.findMany({
      where: { account_number },
      orderBy: { occurred_at: "asc" },
      select: {
        transaction_id: true,
        account_number: true,
        amount: true,
        transaction_type: true,
        description: true,
        occurred_at: true,
        counterparty_account_number: true,
      },
    });
  },
  async findSeededAccountNumbers(account_numbers: number[]) {
    return prisma.transactions.findMany({
      where: {
        account_number: {
          in: account_numbers,
        },
      },
      select: {
        account_number: true,
      },
      distinct: ["account_number"],
    });
  },
};
