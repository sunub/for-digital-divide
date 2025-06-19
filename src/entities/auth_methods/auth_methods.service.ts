import { UsersId } from "../users/users.model";
import { authMethodsRepository } from "./auth_methods.repository";

import type { AuthMethod, AuthMethodCode } from "./auth_methods.model";

export const authMethodsService = {
  async findByUserId(user_id: UsersId) {
    return authMethodsRepository.findByUserId(user_id);
  },

  async create(data: Omit<AuthMethod, "auth_method_id">) {
    return authMethodsRepository.create(data);
  },

  async delete(auth_method_id: number) {
    return authMethodsRepository.delete(auth_method_id);
  },

  async findAll() {
    return authMethodsRepository.findAll();
  },

  async findAuthMethodByUserId(user_id: UsersId, authMethod: AuthMethodCode) {
    return authMethodsRepository.findAuthMethodByUserId(user_id, authMethod);
  },
};
