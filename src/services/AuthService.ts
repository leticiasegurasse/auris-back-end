import User, { IUser } from '../models/User';

export class AuthService {
  static async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  static async createUser(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }
}
