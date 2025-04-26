import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export class UserService {
  static async createUser(userId: string, crfa: string): Promise<IUser> {
    const objectId = new mongoose.Types.ObjectId(userId);
    return User.create({ userId: objectId, crfa });
  }
  
  static async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).populate('userId');
  }

  static async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updates, { new: true });
  }
}
