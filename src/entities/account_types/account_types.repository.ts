import { prisma } from '@root/prisma';

export const accountTypesRepository = {
  async findByCode(code: string) {
    try {
      return await prisma.account_types.findUnique({
        where: { code },
      });
    } catch (error) {
      console.error('Error finding account type by code:', error);
      throw error;
    }
  },
  async findAll() {
    try {
      return await prisma.account_types.findMany();
    } catch (error) {
      console.error('Error finding all account types:', error);
      throw error;
    }
  },
};
