import { PatientReportService } from '../services/PatientReportService';

export class PatientReportBusiness {
  static async create(data: any) {
    return PatientReportService.create(data);
  }

  static async getAllByUser(userId: string, page: number = 1, limit: number = 5) {
    return PatientReportService.getAllByUser(userId, page, limit);
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

  static async getReportsStats(userId: string) {
    return PatientReportService.getReportsStats(userId);
  }

  static async getByPatientName(userId: string, patientName: string, page: number = 1, limit: number = 5) {
    return PatientReportService.getByPatientName(userId, patientName, page, limit);
  }
}