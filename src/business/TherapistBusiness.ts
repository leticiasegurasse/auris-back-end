import { TherapistService } from '../services/TherapistService';
import { ITherapist } from '../models/Therapist';

export class TherapistBusiness {
  static async getById(id: string): Promise<ITherapist> {
    const therapist = await TherapistService.getTherapistById(id);
    if (!therapist) throw new Error('Therapist not found');
    return therapist;
  }

  static async update(id: string, data: Partial<ITherapist>): Promise<ITherapist> {
    const updated = await TherapistService.updateTherapist(id, data);
    if (!updated) throw new Error('Failed to update therapist');
    return updated;
  }

  static async getAll(): Promise<ITherapist[]> {
    return TherapistService.getAllTherapists();
  }

  static async cancelSubscription(id: string): Promise<ITherapist> {
    const therapist = await TherapistService.cancelSubscription(id);
    if (!therapist) throw new Error('Failed to cancel subscription');
    return therapist;
  }
}
