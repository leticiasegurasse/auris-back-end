import Therapist, { ITherapist } from '../models/Therapist';
import mongoose from 'mongoose';

export class TherapistService {
  static async createTherapist(userId: string, crfa: string): Promise<ITherapist> {
    const objectId = new mongoose.Types.ObjectId(userId);
    return Therapist.create({ userId: objectId, crfa });
  }
  
  static async getTherapistById(id: string): Promise<ITherapist | null> {
    return Therapist.findById(id).populate('userId');
  }

  static async updateTherapist(id: string, updates: Partial<ITherapist>): Promise<ITherapist | null> {
    return Therapist.findByIdAndUpdate(id, updates, { new: true });
  }
}
