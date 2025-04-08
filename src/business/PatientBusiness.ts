import { PatientService } from '../services/PatientService';
import { IPatient } from '../models/Patient';

export class PatientBusiness {
  static async getAllByTherapist(therapistId: string): Promise<IPatient[]> {
    return PatientService.getPatientsByTherapist(therapistId);
  }

  static async getById(id: string): Promise<IPatient> {
    const patient = await PatientService.getPatientById(id);
    if (!patient) throw new Error('Patient not found');
    return patient;
  }

  static async update(id: string, data: Partial<IPatient>): Promise<IPatient> {
    const updated = await PatientService.updatePatient(id, data);
    if (!updated) throw new Error('Failed to update patient');
    return updated;
  }
}
