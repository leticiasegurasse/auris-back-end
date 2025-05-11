import { PatientReportService } from '../services/PatientReportService';

export class PatientReportBusiness {
  static async create(data: any) {
    return PatientReportService.create(data);
  }

  static async getAllByUser(userId: string) {
    return PatientReportService.getAllByUser(userId);
  }

  static async getById(id: string) {
    return PatientReportService.getById(id);
  }

  static async update(id: string, data: any) {
    return PatientReportService.update(id, data);
  }

  static async getByPatientId(patientId: string) {
    return PatientReportService.getByPatientId(patientId);
  }
}