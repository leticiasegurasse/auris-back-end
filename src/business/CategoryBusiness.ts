import { CategoryService } from '../services/CategoryService';

export class CategoryBusiness {
  static async create(data: any) {
    return CategoryService.create(data);
  }

  static async getAllByTherapist(therapistId: string) {
    return CategoryService.getAllByTherapist(therapistId);
  }

  static async getById(id: string) {
    return CategoryService.getById(id);
  }

  static async update(id: string, data: any) {
    return CategoryService.update(id, data);
  }

  static async delete(id: string) {
    return CategoryService.delete(id);
  }
}
