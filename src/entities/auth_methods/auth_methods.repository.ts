import { prisma } from "@root/prisma";

import type { AuthMethod, AuthMethodCode } from "./auth_methods.model";
import type { UsersId } from "../users/users.model";

export const authMethodsRepository = {
  async findByUserId(user_id: UsersId) {
    return prisma.auth_methods.findMany({
      where: { user_id },
    });
  },

  async create(data: Omit<AuthMethod, "auth_method_id">) {
    return prisma.auth_methods.create({
      data,
    });
  },

  async delete(auth_method_id: number) {
    return prisma.auth_methods.delete({
      where: { auth_method_id },
    });
  },

  async findAll() {
    return prisma.auth_methods.findMany();
  },

  async findAuthMethodByUserId(user_id: UsersId, authMethod: AuthMethodCode) {
    return prisma.auth_methods.findMany({
      where: {
        user_id,
        method: authMethod,
      },
    });
  }
}
