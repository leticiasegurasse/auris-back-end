import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserBusiness.getById(id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserBusiness.update(id, updates);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
