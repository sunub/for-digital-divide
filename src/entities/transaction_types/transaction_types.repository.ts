import { prisma } from '@root/prisma/prisma';
import { TransactionTypeCode } from './transaction_types.model';

export const transactionTypeRepository = {
  async findByCode(code: TransactionTypeCode) {
    try {
      return await prisma.transaction_types.findUnique({
        where: { code },
      });
    } catch (error) {
      console.error('Erro finding transaction types by code:', error);
      throw error;
    }
  },
  async findAll() {
    try {
      return await prisma.transaction_types.findMany();
    } catch (error) {
      console.error('Error finding all account types:', error);
      throw error;
    }
  },
};
