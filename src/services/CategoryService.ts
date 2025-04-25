import Category from '../models/Category';

export class CategoryService {
  static async create(data: any) {
    return Category.create(data);
  }

  static async getAllByTherapist(therapistId: string) {
    return Category.find({ therapistId });
  }

  static async getById(id: string) {
    return Category.findById(id);
  }

  static async update(id: string, data: any) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return Category.findByIdAndDelete(id);
  }
}
