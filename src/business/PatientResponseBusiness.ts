import { PatientResponseService } from '../services/PatientResponseService';

export class PatientResponseBusiness {
  static async create(data: any) {
    return PatientResponseService.create(data);
  }

  static async getAll() {
    return PatientResponseService.getAll();
  }

  static async getById(id: string) {
    return PatientResponseService.getById(id);
  }

  static async update(id: string, data: any) {
    return PatientResponseService.update(id, data);
  }

}
