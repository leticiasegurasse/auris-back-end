import Patient, { IPatient } from '../models/Patient';
import mongoose from 'mongoose';

export class PatientService {
  static async createPatient(
    userId: string,
    therapistId: string,
    birthDate: Date,
    diagnosis?: string
  ): Promise<IPatient> {
    const therapistObjectId = new mongoose.Types.ObjectId(therapistId);
    const parsedDate = new Date(birthDate);

    return Patient.create({
      userId,
      therapistId: therapistObjectId,
      birthDate: parsedDate,
      diagnosis
    });
  }

  static async getPatientsByTherapist(therapistId: string, page: number = 1, limit: number = 5): Promise<{ patients: IPatient[], pagination: { total: number, page: number, limit: number, totalPages: number } }> {
    const skip = (page - 1) * limit;
    
    const [patients, total] = await Promise.all([
      Patient.find({ therapistId })
        .populate('userId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Patient.countDocuments({ therapistId })
    ]);

    return {
      patients,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getPatientById(id: string): Promise<IPatient | null> {
    return Patient.findById(id).populate('userId');
  }

  static async getPatientByUserId(userId: string): Promise<IPatient | null> {
    return Patient.findOne({ userId: new mongoose.Types.ObjectId(userId) }).populate('userId');
  }

  static async updatePatient(id: string, updates: Partial<IPatient>): Promise<IPatient | null> {
    return Patient.findByIdAndUpdate(id, updates, { new: true });
  }
}
