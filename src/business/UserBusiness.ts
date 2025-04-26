import { UserService } from "../services/UserService";
import { IUser } from '../models/User';

export class UserBusiness {
  static async getById(id: string): Promise<IUser> {
    const user = await UserService.getUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  static async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const updated = await UserService.updateUser(id, data);
    if (!updated) throw new Error('Failed to update User');
    return updated;
  }
}
