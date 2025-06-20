import { TransactionTypeCode } from './transaction_types.model';
import { transactionTypeRepository } from './transaction_types.repository';

export const transactionTypeService = {
  async findByCode(code: TransactionTypeCode) {
    return transactionTypeRepository.findByCode(code);
  },
  async findAll() {
    return transactionTypeRepository.findAll();
  },
};
