import { Request, Response } from 'express';
import { AuthBusiness } from '../business/AuthBusiness';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthBusiness.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await AuthBusiness.login({ email, password });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
