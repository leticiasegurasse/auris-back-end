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

  static async getPatientsByTherapist(therapistId: string): Promise<IPatient[]> {
    return Patient.find({ therapistId }).populate('userId');
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
