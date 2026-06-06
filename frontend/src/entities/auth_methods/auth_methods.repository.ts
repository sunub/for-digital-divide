import { prisma } from "@root/prisma/prisma";
import type { UsersId } from "../users/users.model";
import type { AuthMethod, AuthMethodCode } from "./auth_methods.model";

export const authMethodsRepository = {
  async findByUserId(user_id: UsersId) {
    return prisma.auth_methods.findMany({
      where: { user_id },
    });
  },

  async findPasswordMethod(user_id: number) {
    return prisma.auth_methods.findFirst({
      where: {
        user_id,
        method: "PASSWORD",
      },
      select: {
        auth_method_id: true,
        user_id: true,
        method: true,
        credential: true,
        provider: true,
        provider_uid: true,
        created_at: true,
      },
    });
  },

  async findByProviderUid(provider_uid: string) {
    return prisma.auth_methods.findMany({
      where: {
        provider_uid: {
          equals: provider_uid,
          mode: "insensitive",
        },
      },
    });
  },

  async findByProviderUidAndMethod(
    provider_uid: string,
    method: AuthMethodCode,
  ) {
    return prisma.auth_methods.findFirst({
      where: {
        method,
        provider_uid: {
          equals: provider_uid,
          mode: "insensitive",
        },
      },
      select: {
        auth_method_id: true,
        user_id: true,
        method: true,
        credential: true,
        provider: true,
        provider_uid: true,
        created_at: true,
      },
    });
  },

  async upsertDataByUserId(data: Omit<AuthMethod, "auth_method_id">) {
    return prisma.auth_methods.upsert({
      where: {
        user_id_method: {
          user_id: data.user_id,
          method: data.method,
        },
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
    return prisma.auth_methods.findFirst({
      where: {
        user_id,
        method: authMethod,
      },
    });
  },
};
