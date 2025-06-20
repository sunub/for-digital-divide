import { prisma } from '@root/prisma';
import { Transaction } from './transaction.model';

export const transactionsRepository = {
  async findById(transaction_id: number) {
    return prisma.transactions.findUnique({
      where: { transaction_id },
    });
  },
  async create(data: Omit<Transaction, 'transaction_id'>) {
    return prisma.transactions.create({
      data,
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
};
