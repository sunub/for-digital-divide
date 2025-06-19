import { usersRepository } from "./users.repository";
import type { Users, UsersId } from "./users.model";

export const userService = {
  async findByUserId(user_id: UsersId) {
    return usersRepository.findByUserId(user_id);
  },

  async create(data: Omit<Users, "user_id">) {
    return usersRepository.create(data);
  },

  async delete(user_id: UsersId) {
    return usersRepository.delete(user_id);
  },

  async findAll() {
    return usersRepository.findAll();
  },

  async findByName(name: string) {
    return usersRepository.findByName(name);
  }
}
