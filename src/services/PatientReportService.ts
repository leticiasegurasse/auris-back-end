import PatientReport from '../models/PatientReport';
import mongoose from 'mongoose';

export class PatientReportService {
  static async create(data: any) {
    return PatientReport.create(data);
  }

  static async getAllByUser(userId: string) {
    return PatientReport.find({ userId });
  }

  static async getById(id: string) {
    return PatientReport.findById(id);
  }

  static async update(id: string, data: any) {
    return PatientReport.findByIdAndUpdate(id, data, { new: true });
  }

  static async getByPatientId(patientId: string) {
    const objectId = new mongoose.Types.ObjectId(patientId);
    return PatientReport.find({ patientId: objectId })
      .populate('userId')
      .populate('patientId');
  }
}