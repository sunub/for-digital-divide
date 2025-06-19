import { prisma } from "@root/prisma"
import { Users, UsersId } from "./users.model";

export const usersRepository = {
  async findByUserId(user_id: UsersId) {
    return prisma.users.findUnique({
      where: { user_id },
    });
  },
  async create(data: Omit<Users, "user_id">) {
    return prisma.users.create({
      data
    });
  },
  async delete(user_id: UsersId) {
    return prisma.users.delete({
      where: { user_id },
    });
  },
  async findAll() {
    return prisma.users.findMany();
  },
  async findByName(name: string) {
    return prisma.users.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
    });
  }
}
