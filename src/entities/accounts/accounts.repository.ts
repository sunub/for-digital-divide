import { prisma } from "@root/prisma/prisma";
import type { AccountType } from "./accounts.model";

export const accountsRepository = {
  async findByUserId(user_id: number) {
    return prisma.accounts.findMany({
      where: { user_id },
      orderBy: { created_at: "asc" },
    });
  },

  async createMany(data: AccountType[]) {
    return prisma.accounts.createMany({
      data,
      skipDuplicates: true,
    });
  },

  async updateByAccountNumber(
    account_number: number,
    data: Partial<AccountType>,
  ) {
    return prisma.accounts.update({
      where: { account_number },
      data,
    });
  },

  async updateManyByAccountNumbers(accounts: AccountType[]) {
    return prisma.$transaction(
      accounts.map((account) =>
        prisma.accounts.update({
          where: { account_number: account.account_number },
          data: {
            account_type: account.account_type,
            balance: account.balance,
            created_at: account.created_at,
            user_id: account.user_id,
          },
        }),
      ),
    );
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

  async findByAccountNumbers(account_numbers: number[]) {
    return prisma.accounts.findMany({
      where: {
        account_number: {
          in: account_numbers,
        },
      },
    });
  },
};
