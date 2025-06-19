import type { AccountType } from "./accounts.model";
import { accountsRepository } from "./accounts.repository";

export const accountsService = {
  async findByUserId(user_id: number) {
    return accountsRepository.findByUserId(user_id);
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
}
