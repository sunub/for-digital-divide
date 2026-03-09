import { prisma } from "@root/prisma/prisma";
import type { AccountType } from "./accounts.model";

export const accountsRepository = {
  async findByUserId(user_id: number) {
    return prisma.accounts.findMany({
      where: { user_id },
    });
  },

  async updateByAccountNumber(
    account_number: number,
    data: Partial<AccountType>,
  ) {
    return prisma.accounts.update({
      where: { account_number: BigInt(account_number) },
      data: {
        ...data,
        account_number:
          data.account_number !== undefined
            ? BigInt(data.account_number)
            : undefined,
      },
    });
  },

  async create(data: AccountType) {
    return prisma.accounts.create({
      data: {
        ...data,
        account_number: BigInt(data.account_number),
      },
    });
  },

  async delete(account_number: number) {
    return prisma.accounts.delete({
      where: { account_number: BigInt(account_number) },
    });
  },

  async findByAccountNumber(account_number: number) {
    return prisma.accounts.findUnique({
      where: { account_number: BigInt(account_number) },
    });
  },

  async findManyByAccountNumbers(account_numbers: number[]) {
    return prisma.accounts.findMany({
      where: {
        account_number: { in: account_numbers.map((n) => BigInt(n)) },
      },
    });
  },

  async createManyAndReturn(data: AccountType[]) {
    return prisma.accounts.createManyAndReturn({
      data: data.map((d) => ({
        ...d,
        account_number: BigInt(d.account_number),
      })),
    });
  },
};
