import { AccountType } from './account_types.model';
import { accountTypesRepository } from './account_types.repository';

export const accountTypesService = {
  async findByCode(code: AccountType['code']) {
    return accountTypesRepository.findByCode(code);
  },
  async findAll() {
    return accountTypesRepository.findAll();
  },
};
