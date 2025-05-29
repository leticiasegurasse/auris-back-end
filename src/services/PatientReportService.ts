import PatientReport from '../models/PatientReport';
import mongoose from 'mongoose';

export class PatientReportService {
  static async create(data: any) {
    return PatientReport.create(data);
  }

  static async getAllByUser(userId: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    
    const [reports, total] = await Promise.all([
      PatientReport.find({ userId })
        .populate('userId', 'name')
        .populate({
          path: 'patientId',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'name_user'
          }
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      PatientReport.countDocuments({ userId })
    ]);

    return {
      reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
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
      .populate('userId', 'name')
      .populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name_user'
        }
      });
  }
}