import { prisma } from '@root/prisma';
import { Users, UsersId } from './users.model';

export const usersRepository = {
  async findByUserId(user_id: UsersId) {
    return prisma.users.findUnique({
      where: { user_id },
    });
  },
  async upsertSessionByUsernameAndEmail(username: string, email: string, session_id: string) {
    return prisma.users.upsert({
      where: { name: username, email },
      update: { session_id },
      create: { name: username, email, session_id },
    });
  },
  async findByUsernameAndEmail(username: string, email: string) {
    return prisma.users.findFirst({
      where: {
        name: username,
        email,
      },
    });
  },
  async findUserBySessionId(session_id: string) {
    return prisma.users.findFirst({
      select: { user_id: true },
      where: { session_id },
    });
  },
  async create(data: Users) {
    return prisma.users.createMany({
      data: [data],
      skipDuplicates: true,
    });
  },
  async updateSessionIdByUserId(user_id: UsersId, session_id: string) {
    return prisma.users.update({
      where: { user_id },
      data: { session_id },
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
  },
};
