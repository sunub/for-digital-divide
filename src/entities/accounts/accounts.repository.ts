import { prisma } from '@root/prisma';
import type { AccountType } from './accounts.model';

export const accountsRepository = {
  async findByUserId(user_id: number) {
    return prisma.accounts.findMany({
      where: { user_id },
    });
  },

  async create(data: AccountType) {
    return prisma.accounts.create({
      data,
    });
  },

  async delete(account_number: number) {
    return prisma.accounts.delete({
      where: { account_number },
    });
  },

  async findByAccountNumber(account_number: number) {
    return prisma.accounts.findUnique({
      where: { account_number },
    });
  },
};
