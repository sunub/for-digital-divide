import { Transaction } from './transaction.model';
import { transactionsRepository } from './transaction.repository';

export const transactionsService = {
  async findById(transaction_id: number) {
    return transactionsRepository.findById(transaction_id);
  },
  async create(data: Omit<Transaction, 'transaction_id'>) {
    return transactionsRepository.create(data);
  },
  async createMany(data: Omit<Transaction, 'transaction_id'>[]) {
    return transactionsRepository.createMany(data);
  },
  async delete(transaction_id: number) {
    return transactionsRepository.delete(transaction_id);
  },
  async findAll() {
    return transactionsRepository.findAll();
  },
  async findByAccountNumber(account_number: number) {
    return transactionsRepository.findByAccountNumber(account_number);
  },
};
