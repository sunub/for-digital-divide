import type { AccountType } from "./accounts.model";
import { accountsRepository } from "./accounts.repository";

export const accountsService = {
  async findByUserId(user_id: number) {
    return accountsRepository.findByUserId(user_id);
  },

  async createMany(data: AccountType[]) {
    return accountsRepository.createMany(data);
  },

  async updateByAccountNumber(
    account_number: number,
    data: Partial<AccountType>,
  ) {
    return accountsRepository.updateByAccountNumber(account_number, data);
  },

  async updateManyByAccountNumbers(accounts: AccountType[]) {
    return accountsRepository.updateManyByAccountNumbers(accounts);
  },

  async create(data: AccountType) {
    return accountsRepository.create(data);
  },

  async delete(account_number: number) {
    return accountsRepository.delete(account_number);
  },

  async findByAccountNumber(account_number: number) {
    return accountsRepository.findByAccountNumber(account_number);
  },

  async findByAccountNumbers(account_numbers: number[]) {
    return accountsRepository.findByAccountNumbers(account_numbers);
  },
};
