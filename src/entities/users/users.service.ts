import type { Users, UsersId } from './users.model';
import { usersRepository } from './users.repository';

export const userService = {
  async findByUserId(user_id: UsersId) {
    return usersRepository.findByUserId(user_id);
  },
  async findByEmail(email: string) {
    return usersRepository.findByEmail(email);
  },

  async upsertSessionByUsernameAndEmail(username: string, email: string, session_id?: string) {
    return usersRepository.upsertSessionByUsernameAndEmail(username, email, session_id);
  },

  async findUserBySessionId(session_id: string) {
    return usersRepository.findUserBySessionId(session_id);
  },

  async create(data: Users) {
    return usersRepository.create(data);
  },

  async delete(user_id: UsersId) {
    return usersRepository.delete(user_id);
  },

  async updateSessionIdByUserId(user_id: UsersId, session_id: string) {
    return usersRepository.updateSessionIdByUserId(user_id, session_id);
  },

  async findAll() {
    return usersRepository.findAll();
  },

  async findByName(name: string) {
    return usersRepository.findByName(name);
  },

  async findByUsernameAndEmail(username: string, email: string) {
    return usersRepository.findByUsernameAndEmail(username, email);
  },
};
