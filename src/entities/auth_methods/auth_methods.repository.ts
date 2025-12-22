import { prisma } from "@root/prisma/prisma";
import type { UsersId } from "../users/users.model";
import type { AuthMethod, AuthMethodCode } from "./auth_methods.model";

export const authMethodsRepository = {
  async findByUserId(user_id: UsersId) {
    return prisma.auth_methods.findMany({
      where: { user_id },
    });
  },

  async findPasswordMethod(userId: number) {
    return prisma.auth_methods.findFirst({
      where: {
        user_id: userId,
        method: "PASSWORD",
      },
    });
  },

  async findByProviderUid(provider_uid: string) {
    return prisma.auth_methods.findMany({
      where: { provider_uid: provider_uid },
    });
  },

  async upsertDataByUserId(data: Omit<AuthMethod, "auth_method_id">) {
    const authMethodExists = await prisma.auth_methods.findFirst({
      where: { user_id: data.user_id, method: data.method },
    });

    return prisma.auth_methods.upsert({
      where: {
        auth_method_id: authMethodExists?.auth_method_id || 0,
      },
      update: data,
      create: data,
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
  },
};
