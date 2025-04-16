import PatientReport from '../models/PatientReport';

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

}