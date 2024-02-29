import { User } from "../models/user/User";
import { UserRepository } from "../database/UserRepository";

export class Auth {

  static async login(email: string, password: string): Promise<User | boolean> {
    try {
      const repository = new UserRepository();
      const users = await repository.getAllUsers();

      for (const userData of users) {
        if (userData.email === email && userData.password === password) {
          return new User(
            userData.age,
            userData.name,
            userData.email,
            userData.password,
            userData.userTypeId,
          );
        }
      }
      return false;
    } catch (error) {
      console.error('Houve um erro no sistema:', error);
      return false;
    }
  }
}