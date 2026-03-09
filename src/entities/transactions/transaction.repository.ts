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
    return prisma.transactions.findMany();
  },
  async findByAccountNumber(account_number: number) {
    return prisma.transactions.findMany({
      where: { account_number: account_number },
    });
  },
  async findByAccountNumbers(account_numbers: number[]) {
    return prisma.transactions.findMany({
      where: { account_number: { in: account_numbers } },
      select: { account_number: true },
    });
  },
};
